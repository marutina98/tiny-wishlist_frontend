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

    const request = await props.getList(route);
    
    if (request.ok) {
      const response = await request.json();
      data.list = response;
    } else {
      router.push({
        path: '/not-found'
      });
    }

  });

</script>

<template>
  <DefaultTemplate>
    <template v-slot:main>
      {{ data.list }}
    </template>
  </DefaultTemplate>
</template>

<style scoped>
</style>
