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

  <div class="item">

  <div class="item-header" :style="css">
    <div v-if="item.archived || item.reserved" class="item-status">
      <span v-if="item.archived" class="item-archived">
        Archived
      </span>

      <span v-if="item.reserved" class="item-reserved">
        Reserved
      </span>
    </div>
      
  </div>

  <div class="item-info">
    <div class="item-info-row">
      <div class="item-title">{{ item.title }}</div>
      <div class="item-description">{{ item.description }}</div>
    </div>
    <div class="item-info-row item-info-row-grid">
      <div class="item-quantity">{{ item.quantity }}</div>
      <div class="item-price">{{ item.price }}</div>
    </div>
  </div>

</div>

</template>

<style scoped>

  /* @todo: add different appearance for reserved item */

  @reference 'tailwindcss';

  .item {
    @apply flex flex-col gap-2;
  }

  .item-header {
    @apply flex flex-col justify-between;
    background-image: var(--background-image);
    background-position: center center;
    background-size: contain;
    height: 300px;
  }

  .item-status {
    @apply flex justify-center gap-2 w-full p-2;
  }

  .item-info {
    @apply flex flex-col gap-2;
  }

  .item-info-row-grid {
    @apply grid grid-cols-2 gap-2 text-center;
  }

  .item-title,
  .item-description,
  .item-archived,
  .item-reserved,
  .item-price,
  .item-quantity {
    @apply bg-stone-50 p-2 text-sm;
  }

  .item-title {
    @apply font-bold truncate;
  }

  .item-description {
    @apply italic;
  }

  :is(
    .item-price,
    .item-quantity
  )::before {
    @apply uppercase underline mr-1;
  }

  .item-price::before {
    content: 'Price';
  }

  .item-quantity::before {
    content: 'Quantity';
  }

</style>