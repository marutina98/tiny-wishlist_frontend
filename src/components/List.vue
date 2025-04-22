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
  const priorityId = computed(() => props.list.priorityId as number);
  
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

        <div v-if="list.groups.length > 0" class="groups">
          <Group v-for="group of list.groups" :group :key="group.id" />
        </div>

        <div v-else class="groups no-groups">
          There are no groups present in this list.
        </div>

      </template>

      <!-- Show user info -->

      <template #footer>
        <footer>
          <div class="user">
            <span class="user-author">Author:</span>
            <span class="user-username">{{ list.user.username }}</span>
          </div>
        </footer>
      </template>

    </UCard>

  </div>

</template>

<style scoped>
  
  @reference 'tailwindcss';

  header,
  footer {
    @apply text-sm;
  }

  .list {
    @apply max-w-7xl mx-auto;
  }

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

  .groups:not(.no-groups) {
    @apply gap-8 flex flex-col p-2;
  }

  .groups.no-groups {
    @apply text-center text-sm;
  }

  .user {
    @apply gap-1 flex content-center justify-center;
  }

  .user-author {
    @apply underline;
  }

</style>