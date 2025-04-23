<script setup lang="ts">

  import { computed } from 'vue';

  const props = defineProps({
    user: {
      type: Object,
      required: true,
    }
  });

  const user = computed(() => props.user);

</script>

<template>

  <div class="profile-preview">

    <div class="profile-email">
      <span class="profile-label">Email</span>
      <span class="profile-content">{{ user.email }}</span>
    </div>

    <div class="profile-username">
      <span class="profile-label">Username</span>
      <span class="profile-content">{{ user.username }}</span>
    </div>
    
  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .profile-preview {
    
  }

</style>