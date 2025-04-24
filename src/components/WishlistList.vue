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
      <UButton icon="i-system-uicons:plus-circle" label="Create Group" />
      <UButton icon="i-system-uicons:plus-circle" label="Add Item" />
    </div>
  
    <div :class="{ groups: true, 'no-groups': list.groups.length <= 0 }">
      There are no groups present in this list.
    </div>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .settings {
    @apply flex gap-2 justify-end;
  }

  .groups {
    @apply text-center text-sm;
  }

</style>