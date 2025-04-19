<script setup lang="ts">

  import { reactive, onBeforeMount, type Reactive } from 'vue';
  import { useRoute } from 'vue-router';

  import DefaultTemplate from '../templates/DefaultTemplate.vue';
  import type IList from '@/interfaces/list.interface';

  const route = useRoute();

  const props = defineProps({
    getList: {
      type: Function,
      required: true,
    }
  });

  const data: Reactive<{ list: IList|null }> = reactive({
    list: null
  });

  onBeforeMount(async () => {

    // @todo: redirect to another page
    // to show that the list is missing or
    // private

    try {

      const request = await props.getList(route);

      if (request.ok) {
        const response = await request.json();
        data.list = response;

        console.log(response);

      }

    } catch (error: unknown) {
      console.error(error);
    }

  });

</script>

<template>
  <DefaultTemplate>
    <template v-slot:main>
      
      <template v-if="data.list">

        <!-- @todo: list -->
        
        <header>
          <h2>{{ data.list.title }}</h2>
          <p>{{ data.list.description }}</p>
        </header>

        <template v-for="group of data.list.groups" :key="group.id">
          <div class="group">

            <!-- @todo: group -->

            <template v-for="item of group.items" :key="item.id">
              <div class="group-item">
                <!-- @todo: item -->
              </div>
            </template>

          </div>
        </template>

      </template>

    </template>
  </DefaultTemplate>
</template>

<style scoped>
</style>
