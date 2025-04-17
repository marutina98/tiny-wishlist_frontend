<script setup lang="ts">

  import * as v from 'valibot';

  import { reactive, inject, toRaw } from 'vue';
  import { useRouter } from 'vue-router';

  import AlternativeTemplate from '../templates/AlternativeTemplate.vue';

  import type IAuth from '@/interfaces/auth.interface';

  const passwordRegexErrorText = 'Your password must contain at least a lowercase character,' +
                                 'an uppercase character, a number and a special character.';

  const router = useRouter();

  const auth = inject('auth') as IAuth;
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

    // register and move to homepage
    // create token cookie

    const data = toRaw(state);
    const request = await auth.register(data);

    if (request.ok) {

      const response = await request.json();
      const token = response.token;

      auth.addToken(token);

      router.push({
        path: '/'
      });

      toast.add({
        title: 'Success!',
        description: 'You have succesfully registered.',
        color: 'success',
      });

    } else {
      toast.add({
        title: 'Error!',
        description: 'Could not create an account, please try again.',
        color: 'error',
      });
    }
    
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
