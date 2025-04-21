<script setup lang="ts">

  import { computed } from 'vue';
  
  import type IPriority from '@/interfaces/priority.interface';

  const props = defineProps({
    priorityId: {
      type: Number,
      required: true,
    }
  });

  const priorities: IPriority[] = [
    {
      id: 1,
      title: 'Low',
    },
    {
      id: 2,
      title: 'Medium',
    },
    {
      id: 3,
      title: 'High'
    }
  ];

  const getNumberOfStars = computed(() => {

    const priority = priorities.find(p => p.id === props.priorityId) as IPriority;

    const totalStars = 3;
    const fullStars = priority.id;
    const emptyStars = totalStars - fullStars;

    return {
      fullStars,
      emptyStars,
    }

  });

</script>

<template>
  <div class="priority">

    <template v-for="(_, index) of getNumberOfStars.fullStars" :key="index">
      <UIcon name="i-system-uicons:star" class="star star-full" />
    </template>

    <template v-for="(_, index) of getNumberOfStars.emptyStars" :key="index">
      <UIcon name="i-system-uicons:star" class="star star-empty" />
    </template>

  </div>
</template>

<style scoped>

  @reference 'tailwindcss';

  .priority {
    @apply inline-flex content-center justify-center border border-stone-100 rounded-md p-2 mr-2;
  }

  .star {
    @apply size-4;
  }

  .star-full {
    @apply text-yellow-500;
  }

  .star-empty {
    @apply text-stone-200;
  }

</style>