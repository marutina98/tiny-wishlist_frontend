<script setup lang="ts">

  import { computed } from 'vue';

  import Item from './Item.vue';

  const props = defineProps({
    group: {
      type: Object,
      required: true
    }
  });

  const group = computed(() => props.group);
  
</script>

<template>

  <div class="group">

    <div class="items">

      <template v-if="group.items.length > 0" v-for="item of group.items" :key="item.id">
        <Item :item />
      </template>

      <template v-else>
        There are no items.
      </template>

    </div>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .group {
    background-color: red;
    @apply p-2;
  }

  .items {
    background-color: blue;
    @apply gap-4 grid grid-cols-4 p-2;
  }

</style>