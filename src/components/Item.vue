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

  <!-- Add Background Image in variable (thumbnail or placeholder) -->

  <div class="item" :class="{ 'item-reserved': item.reserved }" :style="css">
    <div class="item-content">
      <div class="item-content-top">
        <div class="item-title">{{ item.title }}</div>
        <div class="item-description">{{ item.description }}</div>
      </div>
      <div class="item-content-bottom">
        <div class="item-quantity">
          {{ item.quantity }}
        </div>
        <div class="item-price">
          {{ item.price }}
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

  /* @todo: add different appearance for reserved item */

  @reference 'tailwindcss';

  .item {
    @apply border border-stone-200 p-2 rounded-md aspect-square relative;
  }

  .item-reserved::after {
    @apply opacity-25 bg-stone-500 h-full w-full absolute rounded-md;
    content: '';
    left: 0;
    top: 0;
    z-index: 1;
  }

  .item-reserved::before {
    @apply text-2xl bg-white p-2 uppercase;
    content: 'Reserved';
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
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

  .item-content-top,
  .item-content-bottom {
    @apply flex;
  }

  .item-content-top {
    @apply flex-col gap-2;
  }

  .item-content-bottom {
    @apply justify-between;
  }

  .item-title,
  .item-description,
  .item-quantity,
  .item-price {
    @apply text-xs bg-white p-2;
  }

  .item-title::before {
    @apply underline uppercase mr-1;
    content: 'Title';
  }

  .item-description::before {
    @apply underline uppercase mr-1;
    content: 'Description';
  }

  .item-quantity {
    @apply font-bold;
  }

  .item-quantity::before {
    @apply underline uppercase mr-1 font-normal;
    content: 'Quantity';
  }

  .item-price {
    @apply font-bold;
  }

  .item-price::before {
    @apply mr-1;
    content: '€';
  }

</style>