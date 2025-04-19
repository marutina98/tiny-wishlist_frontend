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

  <div class="list p-4">

    <UCard>

      <template #header>
        Header        
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
        Footer
      </template>

    </UCard>

  </div>

</template>

<style scoped>
  
  @reference 'tailwindcss';

  .groups {
    background-color: yellow;
    @apply gap-4 grid grid-cols-1 p-2;
  }

</style>