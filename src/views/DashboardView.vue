<script setup lang="ts">

  import { ref } from 'vue';

  import DefaultTemplate from '../templates/DefaultTemplate.vue';

  import Profile from '@/components/Profile.vue';
  import Wishlists from '@/components/Wishlists.vue';

  import type { Ref } from 'vue';
  import type { TabsItem } from '@nuxt/ui';

  const active = ref(0);
  const components = [Profile, Wishlists];

  const items: Ref<TabsItem[]> = ref([
    {
      label: 'Profile'
    },
    {
      label: 'Wishlists'
    }
  ]);

</script>

<template>
  <DefaultTemplate>
    <template v-slot:main>
      <div class="wrapper">
        <div class="tabs">
          <UTabs v-model="active" :content="false" :items />
        </div>

        <div class="content">
          <UCard>
            <template #default>
              <component :is="components[active]"></component>
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
