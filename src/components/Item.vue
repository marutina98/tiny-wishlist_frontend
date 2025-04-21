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
    <div class="item-content">
      <div class="item-content-top">
        <div class="item-title">{{ item.title }}</div>
      </div>
      <div class="item-content-bottom">
        <div class="item-price">
          {{ item.price }}
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .item {
    @apply border border-stone-200 p-2 rounded-md aspect-square relative;
  }

  .item-content {
    @apply flex flex-col content-between justify-between rounded-md absolute;
    --margin: 15px;
    --side: calc(100% - (var(--margin) * 2));
    background-image: var(--background-image);
    background-position: center center;
    background-size: cover;
    height: var(--side);
    padding: var(--margin);
    left: var(--margin);
    top: var(--margin);
    width: var(--side);
  }

  .item-title,
  .item-price {
    @apply text-xs bg-white p-2;
  }

  .item-title::before {
    @apply underline uppercase mr-1;
    content: 'Title';
  }

  .item-price {
    @apply font-bold;
  }

  .item-price::before {
    @apply mr-1;
    content: '€';
  }

</style>