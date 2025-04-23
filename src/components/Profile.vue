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

    <div class="profile-element">
      <span class="profile-label">Email</span>
      <span class="profile-content">{{ user.email }}</span>
    </div>

    <div class="profile-element">
      <span class="profile-label">Username</span>
      <span class="profile-content">{{ user.username }}</span>
    </div>
    
  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .profile-preview {
    @apply flex flex-col gap-4 mx-auto max-w-1/2;
  }

  .profile-element {
    @apply flex flex-row text-sm;
  }

  .profile-label,
  .profile-content {
    @apply px-4 py-2;
  }

  .profile-label {
    @apply uppercase text-white bg-green-500;
  }

  .profile-content {
    @apply bg-green-50;
  }

</style>