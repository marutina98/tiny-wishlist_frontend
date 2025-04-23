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

    <div class="profile-button">
      <UModal title="Edit Profile" description="Modal that shows a form to Edit the Profile of the Authenticated User">
        <UButton class="cursor-pointer" label="Edit Profile" />
        <template #content>
          <div class="profile-edit">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Voluptate inventore officiis mollitia necessitatibus asperiores
            id amet esse laboriosam eos illo ut voluptatum tenetur ipsam
            temporibus rem distinctio, in molestiae. Nulla?
          </div>
        </template>
      </UModal>
    </div>
    
  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .profile-preview {
    @apply flex flex-col gap-4 items-center mx-auto w-full;
  }

  .profile-element {
    @apply flex flex-row text-sm w-xl;
  }

  .profile-label,
  .profile-content {
    @apply px-4 py-2;
  }

  .profile-label {
    @apply uppercase text-white bg-green-500 w-24;
  }

  .profile-content {
    --label-width: calc(var(--spacing) * 24);
    width: calc(100% - var(--label-width));
    @apply bg-green-50;
  }

  .profile-edit {
    @apply p-2;
  }

</style>