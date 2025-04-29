<script setup lang="ts">

  import { computed, onBeforeMount, ref, inject } from 'vue';

  import type { Ref } from 'vue';
  import type { TreeItem } from '@nuxt/ui';
  import type IUser from '@/interfaces/user.interface';
  import type IList from '@/interfaces/list.interface';
  import type IAuth from '@/interfaces/auth.interface';

  import WishlistList from './WishlistList.vue';

  import SApi from '@/services/api.service';

  import eventBusRefetch from '@/services/event-bus-refetch.service';

  const auth = inject('auth') as IAuth;

  const props = defineProps({
    user: {
      type: Object,
      required: true,
    }
  });

  const lists = computed(() => (props.user as IUser).lists);

  // Change Active List on Select

  const activeList: Ref<IList|null> = ref(null);

  const onSelectList = (list: IList) => {
    activeList.value = list;
  }

  // Lists as File Tree

  const items: Ref<TreeItem[]> = ref([]);

  onBeforeMount(() => {

    // Get wishlists with their statuses

    const publicLists = [];
    const privateLists = [];
    
    const archivedPublicLists: TreeItem[] = [];
    const archivedPrivateLists: TreeItem[] = [];

    if (lists.value) {

      for (let list of lists.value) {

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
      const response = await request.json();
      
      console.log(response);

    }

  });

</script>

<template>

  <div class="wishlist-wrapper">

    <div class="wishlist-left">

      <UTree :items />

      <!-- Create a List modal -->

      <div class="wishlist-new-list">
        <UModal>
          <UButton icon="i-system-uicons:plus-circle" label="New List"/>

          <template #content>
            <!-- @todo: new list form -->
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

</style>