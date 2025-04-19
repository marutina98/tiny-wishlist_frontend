<script setup lang="ts">

  import { computed } from 'vue';

  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  });

  const item = computed(() => props.item);
  
</script>

<template>

  {{ item }}

</template>

<style scoped></style>