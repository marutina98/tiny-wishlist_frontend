<script setup lang="ts">

  import { reactive, onBeforeMount } from 'vue';
  import { useRoute } from 'vue-router';

  import DefaultTemplate from '../templates/DefaultTemplate.vue';

  const route = useRoute();

  const props = defineProps({
    getList: {
      type: Function,
      required: true,
    }
  });

  const data = reactive({
    list: null
  });

  onBeforeMount(async () => {

    try {

      const request = await props.getList(route);

      if (request.ok) {
        const response = await request.json();
        data.list = response;
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
        {{ data.list }}
      </template>

      <template v-else>
        List is missing or private.
      </template>

    </template>
  </DefaultTemplate>
</template>

<style scoped>
</style>
