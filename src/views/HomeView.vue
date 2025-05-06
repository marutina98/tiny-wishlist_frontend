<script setup lang="ts">
  
  import { inject, computed } from 'vue';

  import DefaultTemplate from '../templates/DefaultTemplate.vue';
  
  import type IAuth from '@/interfaces/auth.interface';

  const auth = inject('auth') as IAuth;
  const isLogged = computed(() => auth.isAuthenticated());

</script>

<template>
  <DefaultTemplate>
    <template v-slot:main>
      
      <div class="wrapper">

        <div class="greeting">
          Hello!
        </div>

        <div class="text">
          Create your own shareable wishlist.
        </div>

        <div class="buttons">

          <template v-if="isLogged">
            <UButton size="xl" to="/dashboard" label="Dashboard" />
          </template>

          <template v-else>
            <UButton size="xl" to="/login" label="Login" />
            <UButton size="xl" to="/register" label="Register" />
          </template>

        </div>

      </div>

    </template>
  </DefaultTemplate>
</template>

<style scoped>

  @reference 'tailwindcss';

  .wrapper {
    --navigation-menu-height: 81px; /* magic number */
    @apply flex flex-col gap-2 items-center justify-center;
    min-height: calc(100vh - var(--navigation-menu-height));
  }

  .greeting {
    @apply text-8xl;
  }

  .text {
    @apply text-3xl;
  }

  .buttons {
    @apply flex flex-row gap-4 mt-2;
  }

</style>
