<script setup lang="ts">

  import type IGroup from '@/interfaces/group.interface';
  import { computed, ref } from 'vue';

  const props = defineProps({
    group: {
      required: true,
      type: Object
    }
  });

  const open = ref(false);
  const group = computed(() => props.group as IGroup);
  
  const toggleCollapsible = () => {
    open.value = !open.value;
  }

  const changeStatus = (id: string) => {
    console.log('change status');
  }

  const deleteItem = (id: string) => {
    console.log('delete item');
  }

</script>

<template>
  
  <div class="group">

    <div class="group-buttons">

      <UButton
        :label="group.title"
        color="neutral"
        variant="subtle"
        trailing-icon="i-lucide-chevron-down"
        block @click="toggleCollapsible"
      />

      <UButton @click="changeStatus(group.id)"
               :label="group.archived ? 'Make Group Active' : 'Archive Group'" />

      <UButton @click="deleteItem(group.id)" label="Delete" />

    </div>

    <UCollapsible v-model:open="open">
      <template #content>
        <template v-if="group.items.length > 0">
          <div class="items">
            <WishlistItem :item v-for="item of group.items" :key="item.id" />
          </div>
        </template>
        <template v-else>
          <div class="items no-items">
            There are no items present in this group.
          </div>
        </template>
      </template>
    </UCollapsible>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .group-buttons {
    @apply flex flex-row gap-2;
  }

  .items.no-items {
    @apply text-center text-sm p-2;
  }

</style>