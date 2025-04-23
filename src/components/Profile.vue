<script setup lang="ts">

  import { computed } from 'vue';

  const props = defineProps({
    user: {
      type: Object,
      required: true,
    }
  });

  const user = computed(() => props.user);

</script>

<template>

  Profile

  {{ user }}
  
</template>

<style scoped>
  @reference 'tailwindcss';
</style>