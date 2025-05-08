<script setup lang="ts">

  import { computed, ref } from 'vue';

  import Item from './Item.vue';

  import type IGroup from '@/interfaces/group.interface';

  const props = defineProps({
    group: {
      type: Object,
      required: true
    }
  });

  const open = ref(true);

  // Get group and change open.value based
  // on its archived status

  const group = computed(() => {
    const group = props.group as IGroup;
    open.value = !group.archived;
    return group;
  });

  const label = computed(() => {
    const group = props.group as IGroup;
    return props.group.archived ? `ARCHIVED: ${group.title}` : group.title;
  });
  
</script>

<template>

  <UCollapsible v-model:open="open">

    <UButton
      :label
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      block
      :disabled="group.archived"
    />

    <template #content>

      <div class="content">

        <UCard>

          <template #default>
            <div v-if="group.items.length > 0" class="items">
              <Item v-for="item of group.items" :item :key="item.id "/>
            </div>
            <div v-else class="items no-items">
              There are no items present in this group.
            </div>
          </template>

        </UCard>

      </div>
  
    </template>

  </UCollapsible>

</template>

<style scoped>

  @reference 'tailwindcss';

  .items:not(.no-items) {
    @apply gap-4 grid grid-cols-4 p-2;
  }

  .items.no-items {
    @apply text-center text-sm;
  }

  .content {
    @apply mb-0.5 mt-2 mx-0.5;
  }

</style>