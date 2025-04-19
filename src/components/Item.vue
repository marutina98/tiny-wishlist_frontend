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
    @apply p-2;
  }

</style>