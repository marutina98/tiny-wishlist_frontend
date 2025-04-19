<script setup lang="ts">

  import { computed } from 'vue';

  import Group from './Group.vue';

  import type IList from '@/interfaces/list.interface';

  const props = defineProps({
    list: {
      type: Object,
      required: true
    }
  });

  const list = computed(() => props.list as IList);
  
</script>

<template>

  <div class="list">

    <!-- Show a thumbnail if present -->

    <template v-if="list.thumbnail.length > 0">
    
      <UCard>
        <template #default>
          <div class="list-thumbnail" :style="{
            backgroundImage: 'url(' + list.thumbnail + ')'
          }"></div>
        </template>
      </UCard>

    </template>

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

      <template #footer>
        User info will be go here.
      </template>

    </UCard>

  </div>

</template>

<style scoped>
  
  @reference 'tailwindcss';

  .list-thumbnail {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    @apply h-64;
  }
  
  .list {
    @apply p-4 flex flex-col gap-4;
  }

  .list-header-pretitle {
    @apply font-bold;
  }

  .list-header-title {
    @apply underline;
  }

  .groups {
    @apply gap-8 flex flex-col p-2;
  }

</style>