<script setup lang="ts">

  import { computed } from 'vue';

  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  });

  const item = computed(() => props.item);
  
</script>

<template>

  <div class="item">
    Item
  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .item {
    @apply border border-stone-200 p-2 rounded-md aspect-square;
  }

</style>