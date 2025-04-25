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
      <div class="item-title">
        {{ item.title }}
      </div>
      <div class="item-description">
        {{ item.description }}
      </div>
    </div>
    <div class="item-settings">

    </div>
  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .item-info {
    @apply flex flex-col aspect-square p-2 gap-2 justify-between;
    background-image: var(--background-image);
    background-position: center center;
    background-size: cover;
  }

  .item-title,
  .item-description {
    @apply bg-white p-2 text-sm truncate;
  }

  :is(.item-title, .item-description)::before {
    @apply uppercase underline mr-0.5;
  }

  .item-title::before {
    content: 'Title';
  }

  .item-description::before {
    content: 'Description';
  }

</style>