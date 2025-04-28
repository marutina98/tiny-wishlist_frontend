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
    <div class="item-info">
      <div class="item-info-top">
        <div class="item-title">
          {{ item.title }}
        </div>
        <div class="item-description">
          {{ item.description }}
        </div>
      </div>
      <div class="item-info-center">

      </div>
      <div class="item-info-bottom">
        <div class="item-quantity">
          {{ item.quantity }}
        </div>
        <div class="item-price">
          {{ item.price }}
        </div>
      </div>
    </div>
    <div class="item-settings">
      <div class="item-delete">
        <UIcon class="item-settings-btn size-5" name="i-system-uicons:trash"  />
      </div>
      <div class="item-edit">
        <UIcon class="item-settings-btn size-5" name="i-system-uicons:pen"  />
      </div>
    </div>
  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .item {
    @apply p-4 relative;
  }

  .item-info {
    @apply flex flex-col aspect-square p-2 gap-2 justify-between;
    background-image: var(--background-image);
    background-position: center center;
    background-size: cover;
  }

  .item-info-top,
  .item-info-center {
    @apply flex flex-col gap-2;
  }

  .item-info-bottom {
    @apply flex flex-row justify-between;
  }

  .item-title,
  .item-description,
  .item-quantity,
  .item-price {
    @apply bg-white p-2 text-sm truncate;
  }

  :is(
    .item-title,
    .item-description,
    .item-quantity
  )::before {
    @apply uppercase underline mr-0.5;
  }

  .item-title::before {
    content: 'Title';
  }

  .item-description::before {
    content: 'Description';
  }

  .item-quantity::before {
    content: 'Quantity';
  }

  .item-price::before {
    @apply mr-0.5;
    content: '€';
  }

  .item-settings {
    @apply flex justify-between absolute h-full w-full top-0 left-0;
  }

  .item-settings-btn {
    @apply rounded-full p-1 text-white w-8 h-8 text-sm cursor-pointer;
  }

  .item-delete .item-settings-btn {
    background-color: var(--color-red-500);
  }

  .item-delete .item-settings-btn:is(:hover, :focus) {
    background-color: var(--color-red-700);
  }

  .item-edit .item-settings-btn {
    background-color: var(--color-green-500);
  }

  .item-edit .item-settings-btn:is(:hover, :focus) {
    background-color: var(--color-green-700);
  }
  

</style>