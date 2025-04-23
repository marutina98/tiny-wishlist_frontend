<script setup lang="ts">

  import { computed, onBeforeMount, ref, type Ref } from 'vue';

  import type { TreeItem } from '@nuxt/ui';
  import type IUser from '@/interfaces/user.interface';

  const props = defineProps({
    user: {
      type: Object,
      required: true,
    }
  });

  const lists = computed(() => (props.user as IUser).lists);

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
          label: list.title
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
      },
      {
        label: 'Private Lists',
        children: archivedPrivateLists,
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

</script>

<template>

  <div class="wishlists-wrapper">
    <div class="tree">
      <UTree :items />
    </div>
    <div class="content">
      Content
    </div>
  </div>
  
</template>

<style scoped>

  @reference 'tailwindcss';

  .wishlists-wrapper {
    @apply flex flex-row gap-2;
  }

  .tree {
    @apply w-1/3;
  }

  .content {
    @apply w-2/3;
  }

</style>