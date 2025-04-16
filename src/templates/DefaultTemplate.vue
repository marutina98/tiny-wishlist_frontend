<script setup lang="ts">

  import { computed, inject } from 'vue';
  import type IAuth from '@/interfaces/auth.interface';

  import NavigationMenu from '@/components/NavigationMenu.vue';

  const auth = inject('auth') as IAuth;
  const isAuthenticated = computed(() => auth.isAuthenticated());

</script>

<template>

  <NavigationMenu :isAuthenticated />

  <main>
    <slot name="main"></slot>
  </main>

</template>

<style scoped>
</style>
