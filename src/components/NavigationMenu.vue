<script setup lang="ts">

  import type { Ref } from 'vue';
  import type { NavigationMenuItem } from '@nuxt/ui';
  
  import { ref, computed, watch, onBeforeMount } from 'vue';
  
  const props = defineProps({
    isAuthenticated: Boolean
  });

  const isAuthenticated = computed(() => props.isAuthenticated);

  const items: Ref<NavigationMenuItem[]> = ref([]);

  // Watch isAuthenticated status

  watch(isAuthenticated, (status: boolean) => {
    setItems(status);
  });

  const setItems = (status: boolean) => {

    const navigationMenuItems: NavigationMenuItem[] = [
      {
        label: 'Homepage',
        icon: 'i-system-uicons:home',
        to: '/',
      }
    ];

    // @todo: if guest show login/register
    // otherwise show dashboard and logout

    if (status) {

      navigationMenuItems.push(...[
        {
          label: 'Dashboard',
          icon: 'i-system-uicons:settings',
        },
        {
          label: 'Logout',
          icon: 'i-system-uicons:close',
        }
      ]);

    } else {

      navigationMenuItems.push(...[
        {
          label: 'Authenticate',
          icon: 'i-system-uicons:user-male',
          children: [
            {
              label: 'Sign In'
            },
            {
              label: 'Sign Up'
            }
          ]
        }
      ])

    }

    items.value = navigationMenuItems;

  }

  onBeforeMount(() => {
    setItems(isAuthenticated.value);
  });

</script>

<template>
  <UContainer class="min-w-full flex justify-between content-center gap-4 p-4 border-b border-b-stone-200">
    <div class="left">
      <UIcon name="i-system-uicons:gift" class="size-12" />
    </div>
    <div class="right">
      <UNavigationMenu :items />
    </div>
  </UContainer>
</template>

<style scoped></style>