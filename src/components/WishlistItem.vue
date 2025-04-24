<script setup lang="ts">

  import { computed } from 'vue';
  import type IItem from '@/interfaces/item.interface';

  const props = defineProps({
    item: {
      required: true,
      type: Object
    }
  });

  const item = computed(() => props.item as IItem);
</script>

<template>
  {{ item }}
</template>

<style scoped>
  @reference 'tailwindcss';
</style>