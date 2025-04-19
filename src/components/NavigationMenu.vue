<script setup lang="ts">

  import type { Ref } from 'vue';
  import type { NavigationMenuItem } from '@nuxt/ui';
  
  import { ref, inject, computed, watch, onBeforeMount } from 'vue';

  import type IAuth from './../interfaces/auth.interface.ts';

  const auth = inject('auth') as IAuth;
  
  const props = defineProps({
    isAuthenticated: Boolean
  });

  const isAuthenticated = computed(() => props.isAuthenticated);

  const items: Ref<NavigationMenuItem[]> = ref([]);

  // Watch isAuthenticated status

  watch(isAuthenticated, (status: boolean) => {
    setItems(status);
  });

  // Logout when clicking on the
  // NavigationMenu 'Logout' Button

  const logout = () => {

    const toast = useToast();
    
    auth.removeToken();

    toast.add({
      title: 'Success!',
      description: 'You have succesfully logged out.',
      color: 'success',
    });

  }

  // Set the NavigationMenu items based
  // on the user being authenticated or
  // a guest

  const setItems = (status: boolean) => {

    const navigationMenuItems: NavigationMenuItem[] = [
      {
        label: 'Homepage',
        icon: 'i-system-uicons:home',
        to: '/',
      }
    ];

    if (status) {

      navigationMenuItems.push(...[
        {
          label: 'Dashboard',
          icon: 'i-system-uicons:settings',
          to: '/dashboard'
        },
        {
          label: 'Logout',
          icon: 'i-system-uicons:close',
          onSelect: (event: Event) => logout(),
        }
      ]);

    } else {

      navigationMenuItems.push(...[
        {
          label: 'Authenticate',
          icon: 'i-system-uicons:user-male',
          children: [
            {
              label: 'Sign In',
              to: '/login'
            },
            {
              label: 'Sign Up',
              to: '/register'
            }
          ]
        }
      ]);

    }

    items.value = navigationMenuItems;

  }

  // Set the initial NavigationMenu
  // based on the isAuthenticated.value
  // at the moment before the mount
  // of the component

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