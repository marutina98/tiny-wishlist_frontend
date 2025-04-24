<script setup lang="ts">
import { computed } from 'vue';


  const props = defineProps({
    list: {
      type: Object,
      required: true,
    }
  });

  const list = computed(() => props.list);

</script>

<template>

  <div class="list">

    <div class="settings">

      <UModal>
        <UButton icon="i-system-uicons:plus-circle" label="Create Group" />

        <template #content>
          <!-- @todo: create a group form -->
        </template>
      </UModal>

      <UModal>
        <UButton icon="i-system-uicons:plus-circle" label="Add Item" />

        <template #content>
          <!-- @todo: create a item form -->
        </template>
      </UModal>
    </div>
  
    <div :class="{ groups: true, 'no-groups': list.groups.length <= 0 }">
      <template v-if="list.groups.length > 0">
        <div v-for="group of list.groups" class="group" :key="group.id">
          <UCollapsible>
            <UButton :label="group.title"/>

            <template #content>
              {{ group }}
            </template>
          </UCollapsible>
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

  .settings {
    @apply flex gap-2 justify-end;
  }

  .groups.no-groups {
    @apply text-center text-sm p-2;
  }

</style>