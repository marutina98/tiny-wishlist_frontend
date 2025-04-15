<script setup lang="ts">
  import NavigationMenu from '@/components/NavigationMenu.vue';
</script>

<template>

  <NavigationMenu />

  <main>
    <slot name="main"></slot>
  </main>

</template>

<style scoped>
</style>
