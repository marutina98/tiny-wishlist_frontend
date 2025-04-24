<script setup lang="ts">

  import type IGroup from '@/interfaces/group.interface';
  import { computed } from 'vue';

  const props = defineProps({
    group: {
      required: true,
      type: Object
    }
  });

  const group = computed(() => props.group as IGroup);

</script>

<template>
  <div class="group">
    <UCollapsible>
      <div class="group-buttons">
        <UButton
          :label="group.title"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
          block
        />

        <template v-if="group.archived">
          <UButton label="Make Group Active" />
        </template>

        <template v-else>
          <UButton label="Archive Group" />
        </template>

        <UButton label="Delete" />
      </div>

      <template #content>
        {{ group }}
      </template>
    </UCollapsible>
  </div>
</template>

<style scoped>

  @reference 'tailwindcss';

  .group-buttons {
    @apply flex gap-2;
  }
  
</style>