<script setup lang="ts">

  import { ref, onBeforeMount, inject, computed } from 'vue';

  import SApi from '@/services/api.service';

  import DefaultTemplate from '../templates/DefaultTemplate.vue';

  import Profile from '@/components/Profile.vue';
  import Wishlists from '@/components/Wishlists.vue';

  import type { Ref } from 'vue';
  import type { TabsItem } from '@nuxt/ui';
  import type IUser from '@/interfaces/user.interface';
  import type IAuth from '@/interfaces/auth.interface';

  const auth = inject('auth') as IAuth;
  const user: Ref<IUser|null> = ref(null);
  const activeComponentIndex = ref('0');

  const components = [
    Profile,
    Wishlists,
  ];

  const items: Ref<TabsItem[]> = ref([
    {
      label: 'Profile'
    },
    {
      label: 'Wishlists'
    }
  ]);
  
  // Get authenticated user
  // put it into user

  onBeforeMount(async () => {
    await fetchAuthenticatedUser();
  });

  const fetchAuthenticatedUser = async () => {

    const token = auth.getToken();
    const request = await SApi.getAuthenticatedUser(token);
    
    if (request.ok) {
      const response = await request.json();
      user.value = response;
    }

  }

</script>

<template>
  <DefaultTemplate>
    <template v-slot:main>
      <div class="wrapper">
        <div class="tabs">
          <UTabs v-model="activeComponentIndex" :content="false" :items />
        </div>
        <div class="content">
          <UCard>
            <template #default>
              <component v-if="user" :user :is="components[parseInt(activeComponentIndex)]"></component>
            </template>
          </UCard>
        </div>
      </div>
    </template>
  </DefaultTemplate>
</template>

<style scoped>

  @reference 'tailwindcss';

  .wrapper {
    @apply flex flex-col gap-2 p-2;
  }

</style>
