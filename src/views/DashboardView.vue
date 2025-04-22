<script setup lang="ts">

  import DefaultTemplate from '../templates/DefaultTemplate.vue';

  import { ref } from 'vue';

  import type { Ref } from 'vue';
  import type { NavigationMenuItem } from '@nuxt/ui';

  const items: Ref<NavigationMenuItem[]> = ref([
    {
      label: 'Profile',
      defaultOpen: true,
      children: [
        {
          label: 'View',
        },
        {
          label: 'Edit',
        }
      ]
    },
    {
      label: 'Wishlists',
      defaultOpen: true,
      children: [
        {
          label: 'View',
        },
        {
          label: 'Create',
        }
      ]
    }
  ]);

  const nav = {
    class: 'left navigation-menu',
    orientation: 'vertical' as 'vertical' | 'horizontal',
    items: items.value,
  }

</script>

<template>
  <DefaultTemplate>
    <template v-slot:main>
      <UNavigationMenu v-bind="nav" />
    </template>
  </DefaultTemplate>
</template>

<style scoped>

  @reference 'tailwindcss';

  .left.navigation-menu {
    @apply w-48;
  }

</style>
