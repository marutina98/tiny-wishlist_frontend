<script setup lang="ts">

  import { computed } from 'vue';

  import Group from './Group.vue';
import { url } from 'inspector';

  const props = defineProps({
    list: {
      type: Object,
      required: true
    }
  });

  const list = computed(() => props.list);
  
</script>

<template>

  <div class="list">

    <UCard>

      <template #header>
        <header class="list-header">
          <span class="list-header-pretitle">
            List:
          </span>
          <span class="list-header-title">
            {{ list.title }}
          </span>
        </header>
      </template>

      <template #default>
        
        <div class="groups">

          <template v-if="list.groups.length > 0" v-for="group of list.groups" :key="group.id">
            <Group :group />
          </template>

          <template v-else>
            There are no groups.
          </template>

        </div>

      </template>

    </UCard>

  </div>

</template>

<style scoped>
  
  @reference 'tailwindcss';
  
  .list {
    @apply p-4;
  }

  .list-header-pretitle {
    @apply font-bold;
  }

  .list-header-title {
    @apply underline;
  }

  .groups {
    @apply gap-8 grid grid-cols-2 p-2;
  }

</style>