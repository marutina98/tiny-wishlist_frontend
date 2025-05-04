<script setup lang="ts">

  import * as v from 'valibot';

  import { computed, onBeforeMount, ref, inject, reactive, toRaw } from 'vue';

  import type { Ref } from 'vue';
  import type { TreeItem } from '@nuxt/ui';
  import type IUser from '@/interfaces/user.interface';
  import type IList from '@/interfaces/list.interface';
  import type IAuth from '@/interfaces/auth.interface';

  import WishlistList from './WishlistList.vue';

  import SApi from '@/services/api.service';
  import SHelpers from '@/services/helpers.service';

  import eventBusRefetch from '@/services/event-bus-refetch.service';
  import type IRequestNewList from '@/interfaces/request-new-list.interface';

  const auth = inject('auth') as IAuth;
  const toast = useToast();

  const props = defineProps({
    user: {
      type: Object,
      required: true,
    }
  });

  const user = computed(() => props.user as IUser);
  const lists = computed(() => (props.user as IUser).lists as IList[]);

  const openList = ref(false);

  const toggleModalList = () => {
    openList.value = !openList.value;
  }

  // Form: Create a New List

  const priorities = [
    {
      id: 1,
      label: 'Low',
    },
    {
      id: 2,
      label: 'Medium',
    },
    {
      id: 3,
      label: 'High',
    }
  ];

  const listState = reactive({
    title: '',
    description: '',
    thumbnail: new File([], ''),
    archived: false,
    private: false,
    priorityId: 1,
  });

  const listSchema = v.object({
    title: v.pipe(
      v.string('Title must be a string.')
    ),
    description: v.pipe(
      v.string('Description must be a string.')
    ),
    thumbnail: v.pipe(
      v.file('Please select an image file.'),
      v.mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file.'),
      v.maxSize(1024 * 1024 * 2, 'Please select a file smaller than 2 MB.'),
    ),
    archived: v.pipe(v.boolean()),
    reserved: v.pipe(v.boolean()),
    priorityId: v.pipe(v.number())
  });


  // Change Active List on Select

  const activeList: Ref<IList|null> = ref(null);

  const onSelectList = (list: IList) => {
    activeList.value = list;
  }

  // Lists as File Tree

  const items: Ref<TreeItem[]> = ref([]);

  onBeforeMount(() => {

    if (lists.value) {
      filterLists(lists.value);
    }

  });

  const fetchAuthenticatedUser = async () => {

    const token = auth.getToken();
    const request = await SApi.getAuthenticatedUser(token);

    if (request.ok) {
      const response = await request.json();
      props.user.value = response;
    }

  }

  const subscribedBus = eventBusRefetch.on(async (refetch: boolean) => {
    
    const token = auth.getToken();
    const request = await SApi.getAuthenticatedUser(token);

    if (request.ok) {
      const response = await request.json() as IUser;
      const lists = response.lists ?? [];
      filterLists(lists);
    }

  });

  const filterLists = (lists: IList[]) => {

    // Get wishlists with their statuses

    const publicLists = [];
    const privateLists = [];
    
    const archivedPublicLists: TreeItem[] = [];
    const archivedPrivateLists: TreeItem[] = [];

    // Change active list

    if (activeList.value) {
      const id = activeList.value.id;
      const list = lists.find((l: IList) => l.id === id);
      if (list) activeList.value = list;
    }

    if (lists) {

      for (let list of lists) {

        const listObj = {
          label: list.title,
          onSelect: () => onSelectList(list)
        }

        if (list.private) {

          if (list.archived) {
            archivedPrivateLists.push(listObj);
          } else {
            privateLists.push(listObj);
          }

        } else {

          if (list.archived) {
            archivedPublicLists.push(listObj);
          } else {
            publicLists.push(listObj);
          }

        }

      }
      
    }
    
    const archivedLists = [
      {
        label: 'Public Lists',
        children: archivedPublicLists,
        defaultExpanded: true,
      },
      {
        label: 'Private Lists',
        children: archivedPrivateLists,
        defaultExpanded: true,
      }
    ];

    // Set items

    const _items = [
      {
        label: 'Wishlists',
        icon: 'i-system-uicons:gift',
        defaultExpanded: true,
        children: [
          {
            label: 'Private Wishlists',
            children: privateLists,
            defaultExpanded: true,
          },
          {
            label: 'Public Wishlists',
            children: publicLists,
            defaultExpanded: true,
          },
          {
            label: 'Archived Wishlists',
            children: archivedLists,
            defaultExpanded: true,
          }
        ]
      }
    ];

    items.value = _items;

  }

  const handleThumbnailChange = (event: Event) => {

    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      listState.thumbnail = target.files[0];
    }

  };

  const createList = (user: IUser) => {
    
    const file = listState.thumbnail;
    const blob = new Blob([file], { type: file.type });

    SHelpers.blobToDataURL(
      blob,
      async (dataUri: string) => {

        // Remove empty elements before
        // sending to backend

        const state = Object.entries(toRaw(listState));

        const newListArr: [string, string|number|boolean][] = [];

        for (let [k, v] of state) {
          
          // if the value is valid
          // add to array

          if (
            (
              typeof v === 'boolean' ||
              (typeof v === 'string' && v.length > 0) ||
              typeof v === 'number'
            ) && k !== 'thumbnail'
          ) {
            newListArr.push([k, v]);
          }

        }

        // check that the datauri is an image and not an empty file

        if (dataUri.length > 0 && !dataUri.startsWith('data:application/')) {
          newListArr.push(['thumbnail', dataUri]);
        }

        const newList: IRequestNewList = {
          userId: user.id,
          title: listState.title,
          description: listState.description,
          thumbnail: dataUri,
          archived: listState.archived,
          private: listState.private,
          priorityId: listState.priorityId,
        };

        const token = auth.getToken();

        const request = await SApi.createList(newList, token);

        // show toast

        if (request.ok) {

          eventBusRefetch.emit(true);

          toast.add({
            title: 'List was created succesfully.',
            color: 'success'
          });

          } else {

          toast.add({
            title: 'List could not be created. Try again.',
            color: 'error'
          });

        }

        toggleModalList();

      }
    );

  }

</script>

<template>

  <div class="wishlist-wrapper">

    <div class="wishlist-left">

      <UTree :items />

      <!-- Create a List modal -->

      <div class="wishlist-new-list">
        <UModal v-model:open="openList">
          <UButton icon="i-system-uicons:plus-circle" label="New List"/>

          <template #content>

            <div class="modal-form-wrapper">

              <UForm class="list-form" :schema="listSchema" :state="listState">

                <UFormField label="Title" name="title">
                  <UInput v-model="listState.title" type="text"/>
                </UFormField>

                <UFormField label="Description" name="description">
                  <UInput v-model="listState.description" type="text"/>
                </UFormField>

                <UFormField label="Thumbnail" name="thumbnail">
                  <UInput @change="handleThumbnailChange" type="file" />
                </UFormField>

                <UFormField label="Private Status" name="private">
                  <UCheckbox v-model="listState.private" label="private" />
                </UFormField>

                <UFormField label="Priority" name="priorityId">
                  <USelect v-model="listState.priorityId" value-key="id" :items="priorities" />
                </UFormField>

                <UButton @click="createList(user)" type="submit" label="Submit" />

              </UForm>
            </div>

          </template>
        </UModal>
      </div>

    </div>

    <div class="wishlist-right">
      <WishlistList v-if="activeList" :list="activeList" />
    </div>
  </div>
  
</template>

<style scoped>

  @reference 'tailwindcss';

  .wishlist-wrapper {
    @apply flex flex-row gap-2;
  }

  .wishlist-left {
    @apply flex flex-col gap-2 w-1/3;
  }

  .wishlist-right {
    @apply w-2/3;
  }

  .wishlist-new-list {
    @apply flex items-center justify-center;
  }

  .modal-form-wrapper {
    @apply flex flex-col items-center p-4;
  }

  .list-form {
    @apply flex flex-col gap-2;
  }

</style>