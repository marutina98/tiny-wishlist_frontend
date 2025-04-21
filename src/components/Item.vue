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
  const cssVariables = computed(() => {
    const item = props.item as IItem;
    const thumbnail = props.item.thumbnail ?? SHelpers.getPlaceholderImage();
    return {
      '--background-image': `url(${thumbnail})`,
    }
  });
  
</script>

<template>

  <!-- Add Background Image in variable (thumbnail or placeholder) -->

  <div class="item" :style="cssVariables">
  
  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .item {
    @apply border border-stone-200 p-2 rounded-md aspect-square relative;
  }

  .item::before {
    @apply rounded-md absolute;
    --margin: 15px;
    --side: calc(100% - (var(--margin) * 2));
    background-image: var(--background-image);
    background-position: center center;
    background-size: cover;
    content: '';
    height: var(--side);
    padding: var(--margin);
    left: var(--margin);
    top: var(--margin);
    width: var(--side);
  }

</style>