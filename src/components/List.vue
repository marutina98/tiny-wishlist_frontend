<script setup lang="ts">

  import { computed } from 'vue';

  import Group from './Group.vue';

  const props = defineProps({
    list: {
      type: Object,
      required: true
    }
  });

  const list = computed(() => props.list);
  
</script>

<template>

  

</template>

<style scoped></style>