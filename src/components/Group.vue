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

  

</template>

<style scoped></style>