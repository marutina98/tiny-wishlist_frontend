<script setup lang="ts">
  
  import * as v from 'valibot';

  import { computed, inject, reactive, ref, toRaw, onBeforeMount } from 'vue';
  
  import type IAuth from '@/interfaces/auth.interface';
  import type IGroup from '@/interfaces/group.interface';

  import SApi from '@/services/api.service';
  import SHelpers from '@/services/helpers.service';

  import eventBusRefetch from '@/services/event-bus-refetch.service';
  import type IRequestNewItem from '@/interfaces/request-new-item.interface';
import type IUser from '@/interfaces/user.interface';
import type IRequestPutList from '@/interfaces/request-put-list.interface';

  const auth = inject('auth') as IAuth;
  const toast = useToast();

  const props = defineProps({
    list: {
      type: Object,
      required: true,
    }
  });

  // Forms

  const newItemState = reactive({
    title: '',
    description: '',
    thumbnail: new File([], ''),
    url: '',
    quantity: 0,
    price: 0,
    archived: false,
    reserved: false,
    groupId: '',
  });

  const newItemSchema = v.object({
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
    url: v.pipe(
      v.string('URL must be a string.'),
      v.url('URL is not a valid url.'),
    ),
    quantity: v.pipe(
      v.number('Quantity must be a number.')
    ),
    price: v.pipe(
      v.number('Price must be  number.'),
      v.minValue(0),
      v.transform(value => parseFloat(value.toFixed(2)))
    ),
    archived: v.pipe(v.boolean()),
    reserved: v.pipe(v.boolean()),
    groupId: v.pipe(v.string())
  });

  const newGroupState = reactive({
    
  });

  const newGroupSchema = v.object({

  });

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

  const editListState = reactive({
    title: '',
    description: '',
    thumbnail: new File([], ''),
    private: false,
    priorityId: 1,
  });

  const editListSchema = v.object({
    title: v.pipe(
      v.nullable(
        v.string('Title must be a string.')
      )
    ),
    description: v.pipe(
      v.nullable(
        v.string('Description must be a string.')
      )
    ),
    thumbnail: v.pipe(
      v.optional(
        v.pipe(
          v.file(),
          v.mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file.'),
          v.maxSize(1024 * 1024 * 2, 'Please select a file smaller than 2 MB.')
        )
      )
    ),
    reserved: v.pipe(v.boolean()),
    priorityId: v.pipe(v.number())
  });

  // Computed Elements

  const list = computed(() => props.list);
  const filteredGroups = computed(() => filterGroups(props.list.groups));
  const archivedGroups = computed(() => filteredGroups.value.archived);
  const activeGroups = computed(() => filteredGroups.value.active);

  // Groups for Select/Options

  const selectGroups = computed(() => {

    const _groups = props.list.groups as IGroup[];

    _groups.map((g: IGroup) => {
      g.label = g.title;
      return g;
    });

    return _groups;

  });

  // Modals

  const openModalDelete = ref(false);
  const openModalNewItem = ref(false);
  const openModalEdit = ref(false);

  const toggleModalDelete = () => {
    openModalDelete.value = !openModalDelete.value;
  }

  const toggleModalNewItem = () => {
    openModalNewItem.value = !openModalNewItem.value;
  }

  const toggleModalEdit = () => {
    openModalEdit.value = !openModalEdit.value;
  }

  // Filter Groups by their archival status
  
  const filterGroups = (_groups: IGroup[]) => {

    const groups: {
      active: IGroup[];
      archived: IGroup[]
    } = {
      active: [],
      archived: [],
    }

    for (let group of _groups) {
      const arrName = group.archived ? 'archived' : 'active';
      groups[arrName as keyof typeof groups].push(group);
    }

    return groups;

  }

  const deleteList = async (id: string) => {
    
    // Get token from auth
    // Pass token to SApi
    // delete list and close modal

    const token = auth.getToken();

    const request = await SApi.deleteList(id, token);

    // show toast

    if (request.ok) {

      eventBusRefetch.emit(true);
      
      toast.add({
        title: 'List was deleted succesfully.',
        color: 'success'
      });

    } else {

      toast.add({
        title: 'List could not be deleted. Try again.',
        color: 'error'
      });

    }

    toggleModalDelete();

  }

  const handleThumbnailChange = (event: Event) => {

    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      newItemState.thumbnail = target.files[0];
    }

    };

  const submitNewItem = (userId: string) => {
    
    const file = newItemState.thumbnail;
    const blob = new Blob([file], { type: file.type });

    SHelpers.blobToDataURL(
      blob,
      async (dataUri: string) => {

        // Remove empty elements before
        // sending to backend

        const state = Object.entries(toRaw(newItemState));

        const newItemArr: [string, string|number|boolean][] = [];

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
            newItemArr.push([k, v]);
          }

        }

        // check that the datauri is an image and not an empty file

        if (dataUri.length > 0 && !dataUri.startsWith('data:application/')) {
          newItemArr.push(['thumbnail', dataUri]);
        }

        const newItem: IRequestNewItem = {
          ...Object.fromEntries(newItemArr),
        };

        const token = auth.getToken();

        const request = await SApi.createItem(newItem, token);

        // show toast

        if (request.ok) {

          eventBusRefetch.emit(true);

          toast.add({
            title: 'Item was updated succesfully.',
            color: 'success'
          });

          } else {

          toast.add({
            title: 'Item could not be updated. Try again.',
            color: 'error'
          });

        }

        toggleModalNewItem();

      }
    );
    
  }

  const submitEditList = () => {

    const file = editListState.thumbnail;
    const blob = new Blob([file], { type: file.type });

    SHelpers.blobToDataURL(
      blob,
      async (dataUri: string) => {

        // Remove empty elements before
        // sending to backend

        const state = Object.entries(toRaw(editListState));

        const editListArr: [string, string|number|boolean][] = [];

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
            editListArr.push([k, v]);
          }

        }

        // check that the datauri is an image and not an empty file

        if (dataUri.length > 0 && !dataUri.startsWith('data:application/')) {
          editListArr.push(['thumbnail', dataUri]);
        }

        const editList: IRequestPutList = {
          id: list.value.id,
          userId: list.value.userId,
          title: editListState.title,
          description: editListState.description,
          thumbnail: dataUri,
          private: editListState.private,
          priorityId: editListState.priorityId,
        };

        const token = auth.getToken();

        const request = await SApi.putList(editList, token);

        // show toast

        if (request.ok) {

          eventBusRefetch.emit(true);

          toast.add({
            title: 'List was update succesfully.',
            color: 'success'
          });

          } else {

          toast.add({
            title: 'List could not be updated. Try again.',
            color: 'error'
          });

        }

        toggleModalEdit();

      }
    );

  }

  // Set editListSchema onBeforeMount

  onBeforeMount(async () => {

    editListState.title = list.value.title;
    editListState.description = list.value.description;
    editListState.private = list.value.private;
    editListState.priorityId = list.value.priorityId;

    const blob = await SHelpers.dataURLToBlob(list.value.thumbnail);
    
    if (blob) {
      const thumbnailFile = new File([blob], '');
      editListState.thumbnail = thumbnailFile;
    }

  });

</script>

<template>

  <div class="list">

    <div class="settings">

      <UModal v-model:open="openModalNewItem">
        <UButton icon="i-system-uicons:plus-circle" label="Add Item" />

        <template #content>
          <div class="modal-form-wrapper">
            <UForm class="edit-form" :schema="newItemSchema" :state="newItemState" @submit.prevent="submitNewItem(list.userId)">

              <UFormField label="Title" name="title">
                <UInput v-model="newItemState.title" type="text"/>
              </UFormField>

              <UFormField label="Description" name="description">
                <UInput v-model="newItemState.description" type="text"/>
              </UFormField>

              <UFormField label="Thumbnail" name="thumbnail">
                <UInput @change="handleThumbnailChange" type="file" />
              </UFormField>

              <UFormField label="URL" name="url">
                <UInput v-model="newItemState.url" type="text" />
              </UFormField>

              <UFormField label="Quantity" name="quantity">
                <UInput v-model="newItemState.quantity" type="number" />
              </UFormField>

              <UFormField label="Price" name="price">
                <UInput v-model="newItemState.price" type="number" />
              </UFormField>

              <UFormField label="Archival Status" name="archived">
                <UCheckbox v-model="newItemState.archived" label="Archived" />
              </UFormField>

              <UFormField label="Reservation Status" name="reserved">
                <UCheckbox v-model="newItemState.reserved" label="Reserved" />
              </UFormField>

              <UFormField label="Group" name="groupId">
                <USelect v-model="newItemState.groupId" value-key="id" :items="selectGroups" />
              </UFormField>

              <UButton type="submit" label="Submit" />

            </UForm>

          </div>
        </template>
      </UModal>

      <UModal v-model:open="openModalEdit">
        <UButton icon="i-system-uicons:pen" label="Edit List" />

        <template #content>

          <UForm class="list-form" :schema="editListSchema" :state="editListState">

            <UFormField label="Title" name="title">
              <UInput v-model="editListState.title" type="text"/>
            </UFormField>

            <UFormField label="Description" name="description">
              <UInput v-model="editListState.description" type="text"/>
            </UFormField>

            <UFormField label="Thumbnail" name="thumbnail">
              <UInput @change="handleThumbnailChange" type="file" />
            </UFormField>

            <UFormField label="Private Status" name="private">
              <UCheckbox v-model="editListState.private" label="private" />
            </UFormField>

            <UFormField label="Priority" name="priorityId">
              <USelect v-model="editListState.priorityId" value-key="id" :items="priorities" />
            </UFormField>

            <UButton @click="submitEditList" type="submit" label="Submit" />

          </UForm>

        </template>
      </UModal>

      <UModal v-model:open="openModalDelete">
        <UButton color="error" icon="i-system-uicons:trash" label="Delete List" />

        <template #content>
          <div class="modal">
            <div class="modal-content">
              Do you want to delete this list ?
            </div>
            <USeparator />
            <div class="modal-buttons">
              <UButton color="success" label="Yes" @click="deleteList(list.id)" />
              <UButton color="error" label="No" @click="toggleModalDelete" />
            </div>
          </div>
        </template>
      </UModal>

      <UModal>
        <UButton icon="i-system-uicons:plus-circle" label="Create Group" />

        <template #content>
          <!-- @todo: create a group form -->



        </template>
      </UModal>

    </div>
  
    <div :class="{ groups: true, 'no-groups': list.groups.length <= 0 }">

      <!-- @todo: when no public/archived groups are present, show message -->

      <template v-if="list.groups.length > 0">
        <div class="groups-active">
          <div class="groups-active-header">
            <h2>Active Groups</h2>
          </div>
          <WishlistGroup :groups="list.groups" v-if="activeGroups.length > 0" :group v-for="group of activeGroups" :key="group.id" />
            <template v-else>
              <div class="groups no-groups">
                There are no active groups available.
              </div>
            </template>
        </div>
        
        <USeparator />

        <div class="groups-archived">
          <div class="groups-archived-header">
            <h2>Archived Groups</h2>
          </div>
          <WishlistGroup :groups="list.groups" v-if="archivedGroups.length > 0" :group v-for="group of archivedGroups" :key="group.id" />
          <template v-else>
            <div class="groups no-groups">
              There are no archived groups available.
            </div>
          </template>
        </div>
      </template>

      <template v-else>
        There are no groups present in this list.
      </template>
    </div>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .list {
    @apply flex flex-col gap-4;
  }

  .settings {
    @apply flex gap-2 justify-end;
  }

  .groups {
    @apply flex flex-col gap-4;
  }

  .groups-active,
  .groups-archived {
    @apply flex flex-col gap-2;
  }

  .groups.no-groups {
    @apply text-center text-sm p-2;
  }

  .groups-active-header,
  .groups-archived-header {
    @apply text-center mb-2 uppercase font-bold;
  }
  
  .modal-content,
  .modal-buttons {
    @apply p-2;
  }

  .modal-buttons {
    @apply flex flex-row gap-2 justify-center;
  }

  .modal-form-wrapper {
    @apply flex flex-col items-center p-4;
  }

</style>