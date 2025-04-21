<script setup lang="ts">

  import { computed } from 'vue';

  import Group from './Group.vue';
  import Priority from './Priority.vue';

  import type IList from '@/interfaces/list.interface';

  const props = defineProps({
    list: {
      type: Object,
      required: true
    }
  });

  const list = computed(() => props.list as IList);
  const priorityId = computed(() => props.list.priorityId as Number);
  
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

    <!-- Show list -->

    <UCard>

      <template #header>
        <header class="list-header">
          <Priority :priorityId />
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

      <!-- Show user info -->

      <template #footer>
        <div class="user">
          <span class="user-author">Author:</span>
          <span class="user-username">{{ list.user.username }}</span>
        </div>
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

  .user {
    @apply gap-1 flex content-center justify-center;
  }

  .user-author {
    @apply underline;
  }

</style>