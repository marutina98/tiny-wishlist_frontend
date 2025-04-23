<script setup lang="ts">

  import type IUser from '@/interfaces/user.interface';
  import { computed } from 'vue';

  const props = defineProps({
    user: {
      type: Object,
      required: true,
    }
  });

  const lists = computed(() => (props.user as IUser).lists);

</script>

<template>

  {{ lists }}

  Wishlists
  
</template>

<style scoped>
  @reference 'tailwindcss';
</style>