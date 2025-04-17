<script setup lang="ts">

  import * as v from 'valibot';

  import { reactive } from 'vue';

  import AlternativeTemplate from '../templates/AlternativeTemplate.vue';

  const passwordRegexErrorText = 'Your password must contain at least a lowercase character,' +
                                 'an uppercase character, a number and a special character.';

  const toast = useToast();
  
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

  const onSubmit = async () => {

    // @todo: register and move to homepage
    // create token cookie

    toast.add({
      title: 'Success!',
      description: 'You have succesfully logged in.',
      color: 'success',
    });
    
  }

</script>

<template>
  <AlternativeTemplate>
    <template v-slot:main>
      <UForm class="space-y-4" :schema :state @submit.prevent="onSubmit">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormField>

        <UFormField label="Username" name="username">
          <UInput v-model="state.username" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormField>

        <UButton type="submit">
          Register
        </UButton>
      </UForm>
    </template>
  </AlternativeTemplate>
</template>

<style scoped>
</style>
