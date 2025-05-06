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

        <template v-if="isLogged">
          Logged
        </template>

        <template v-else>
          Guest
        </template>

      </div>

    </template>
  </DefaultTemplate>
</template>

<style scoped>

  @reference 'tailwindcss';

  .wrapper {
    --navigation-menu-height: 81px; /* magic number */
    @apply flex items-center justify-center;
    min-height: calc(100vh - var(--navigation-menu-height));
  }

</style>
