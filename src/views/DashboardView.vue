<script setup lang="ts">

  import DefaultTemplate from '../templates/DefaultTemplate.vue';

  import { ref } from 'vue';

  import type { Ref } from 'vue';
  import type { NavigationMenuItem } from '@nuxt/ui';

  const items: Ref<NavigationMenuItem[]> = ref([
    {
      label: 'Profile',
      defaultOpen: true,
      icon: 'i-system-uicons:user-male',
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
      icon: 'i-system-uicons:gift',
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
      <div class="wrapper">
        <UNavigationMenu v-bind="nav" />
        <div class="right content">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Unde voluptates nam totam soluta, nesciunt sed illum voluptas
          quae quidem nihil ut, sapiente ab. Dolor ad amet optio rerum,
          cumque aperiam.
        </div>
      </div>
    </template>
  </DefaultTemplate>
</template>

<style scoped>

  @reference 'tailwindcss';

  .wrapper {
    @apply flex gap-2 p-2;
  }

  .left.navigation-menu {
    @apply w-48;
  }

</style>
