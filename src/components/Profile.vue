<script setup lang="ts">

  import { computed, onBeforeMount, reactive, inject, toRaw } from 'vue';

  import * as v from 'valibot';

  import SApi from '@/services/api.service';

  import type IAuth from '@/interfaces/auth.interface';

  const props = defineProps({
    user: {
      type: Object,
      required: true,
    }
  });

  const user = computed(() => props.user);

  const auth = inject('auth') as IAuth;
  const toast = useToast();

  // Edit Profile Form

  const passwordRegexErrorText = 'Your password must contain at least a lowercase character,' +
                                 'an uppercase character, a number and a special character.';

  const schema = v.object({

    email: v.pipe(
      v.string(),
      v.email('Insert a valid email.'),
    ),

    username: v.pipe(
      v.string(),
      v.nonEmpty('Please enter your username.'),
      v.regex(/^[A-Za-z0-9]*$/, 'Your username can only contain letters and numbers.'),
      v.minLength(8, 'Your username must have 8 characters or more.'),
    ),

    password: v.pipe(
      v.string(),
      v.nonEmpty('Please enter your password.'),
      v.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/, passwordRegexErrorText),
      v.minLength(8, 'Your password must have 8 characters or more.'),
    )

  });

  const state = reactive({
    email: '',
    username: '',
    password: '',
  });

  // onSubmit Edit Profile

  const onSubmit = async () => {
    
    // login and move to homepage
    // create token cookie

    const data = toRaw(state);
    const oldToken = auth.getToken();

    const request = await SApi.updateUser(data, oldToken);

    if (request.ok) {

      const response = await request.json();
      const newToken = response.token;

      // Replace old token with newly
      // received token
      
      auth.addToken(newToken);

      toast.add({
        title: 'Success!',
        description: 'You have succesfully updated your profile.',
        color: 'success',
      });

    } else {
      toast.add({
        title: 'Error!',
        description: 'Could not update your profile, please try again.',
        color: 'error',
      });
    }

  }

  // Set default state onBeforeMount

  onBeforeMount(() => {
    state.email = user.value.email;
    state.username = user.value.username;
  });

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
            <UForm class="profile-form" :schema :state @submit.prevent="onSubmit">

              <UFormField label="Email" name="email">
                <UInput v-model="state.email" />
              </UFormField>

              <UFormField label="Username" name="username">
                <UInput v-model="state.username" />
              </UFormField>

              <UFormField label="Password" name="password">
                <UInput v-model="state.password" type="password" />
              </UFormField>

              <div class="profile-btn-wrapper">
                <UButton type="submit">
                  Submit
                </UButton>
              </div>
            </UForm>
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
    @apply p-4 flex justify-center;
  }

  .profile-form {
    @apply flex flex-col gap-4;
  }

  .profile-btn-wrapper {
    @apply flex justify-center;
  }

</style>