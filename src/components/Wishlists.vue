<script setup lang="ts">

  import { computed, onBeforeMount, ref } from 'vue';

  import type IUser from '@/interfaces/user.interface';

  const props = defineProps({
    user: {
      type: Object,
      required: true,
    }
  });

  const lists = computed(() => (props.user as IUser).lists);

  // Lists as File Tree

  const items = ref([]);

  onBeforeMount(() => {

    // Set items

  });

</script>

<template>

  {{ lists }}

  Wishlists
  
</template>

<style scoped>
  @reference 'tailwindcss';
</style>