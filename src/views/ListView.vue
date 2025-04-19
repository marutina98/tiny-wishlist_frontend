<script setup lang="ts">

  import { reactive, onBeforeMount, type Reactive, inject } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  import DefaultTemplate from '../templates/DefaultTemplate.vue';

  import type IList from '@/interfaces/list.interface';
  import type IAuth from '@/interfaces/auth.interface';

  import SApi from '@/services/api.service';

  const route = useRoute();
  const router = useRouter();

  const data: Reactive<{ list: IList|null }> = reactive({
    list: null
  });

  const fetchList = async () => {
    const auth = inject('auth') as IAuth;
    const token = auth.getToken();
    const listId = route.params.id as string;
    return await SApi.getList(listId, token);
  }

  const redirectError = () => {
    router.push({
      path: '/error/list'
    });
  }

  onBeforeMount(async () => {

    // Fetch List and if missing
    // redirect to Error page.

    try {

      const request = await fetchList();

      if (request.ok) {
        const response = await request.json();
        data.list = response;
      }

      if (!data.list) redirectError();

    } catch (error: unknown) {
      console.error(error);
    }

  });

</script>

<template>
  <DefaultTemplate>



    <!-- <template v-slot:main>
      
      <template v-if="data.list">
        
        <header>
          <h2>{{ data.list.title }}</h2>
          <p>{{ data.list.description }}</p>
        </header>

        <template v-for="group of data.list.groups" :key="group.id">
          <div class="group">

            <template v-for="item of group.items" :key="item.id">
              <div class="group-item">
              </div>
            </template>

          </div>
        </template>

      </template>

    </template> -->

  </DefaultTemplate>
</template>

<style scoped>
</style>
