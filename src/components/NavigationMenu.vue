<script setup lang="ts">

  import type { Ref } from 'vue';
  import type { NavigationMenuItem } from '@nuxt/ui';
  
  import { ref } from 'vue';

  const items: Ref<NavigationMenuItem[]> = ref<NavigationMenuItem[]>([
    
  ]);

</script>

<template>
  <UNavigationMenu :items />
</template>

<script scoped></script>