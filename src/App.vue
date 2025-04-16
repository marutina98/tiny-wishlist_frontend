<script setup lang="ts">

  import { computed, inject } from 'vue';
  import type IAuth from './interfaces/auth.interface';

  const auth = inject('auth') as IAuth;

  const isAuthenticated = computed(() => auth.isAuthenticated());

</script>

<template>
  <UApp>
    <RouterView :isAuthenticated />
  </UApp>
</template>

<style scoped>
</style>
