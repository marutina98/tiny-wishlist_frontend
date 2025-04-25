<script setup lang="ts">

  import { computed } from 'vue';
  import SHelpers from '@/services/helpers.service';

  import type IItem from '@/interfaces/item.interface';

  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  });

  const item = computed(() => props.item as IItem);
  const css = computed(() => {
    const thumbnail = props.item.thumbnail ?? SHelpers.getPlaceholderImage();
    return {
      '--background-image': `url(${thumbnail})`
    };
  });
  
</script>

<template>

  <div class="item" :style="css">
    <div class="item-thumbnail"></div>
  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .item-thumbnail {
    aspect-ratio: 1/1;
    background-image: var(--background-image);
    background-position: center center;
    background-size: cover;
  }

</style>