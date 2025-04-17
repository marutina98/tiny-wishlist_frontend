<script setup lang="ts">

  import * as v from 'valibot';

  import AlternativeTemplate from '../templates/AlternativeTemplate.vue';
  import { reactive } from 'vue';
  
  const schema = v.object({

    username: v.pipe(
      v.string(),
      v.nonEmpty('Please enter your username.'),
      v.regex(/^[A-Za-z0-9]*$/, 'Your username can only contain letters and numbers.'),
      v.minLength(8, 'Your username must have 8 characters or more.'),
    ),

    password: v.pipe(
      v.string(),
      v.nonEmpty('Please enter your password.'),
      v.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/, 'Your password must contain at least a lowercase character, an uppercase character, a number and a special character.'),
      v.minLength(8, 'Your password must have 8 characters or more.'),
    )

  });

  const state = reactive({
    username: '',
    password: '',
  });

  const onSubmit = async () => {
    console.log(state);
  }

</script>

<template>
  <AlternativeTemplate>
    <template v-slot:main>
      <UForm class="space-y-4" :schema :state @submit.prevent="onSubmit">
        <UFormField label="Username" name="username">
          <UInput v-model="state.username" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormField>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </template>
  </AlternativeTemplate>
</template>

<style scoped>
</style>
