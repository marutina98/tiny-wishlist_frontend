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

            <div class="items">

              <template v-if="group.items.length > 0" v-for="item of group.items" :key="item.id">
                <Item :item />
              </template>

              <!-- @todo: show message when no items are present -->

              <template v-else>
                There are no items.
              </template>

            </div>
            
          </template>

        </UCard>

      </div>
  
    </template>

  </UCollapsible>

</template>

<style scoped>

  @reference 'tailwindcss';

  .group {
    @apply p-2;
  }

  .items {
    @apply gap-4 grid grid-cols-3 p-2;
  }

  .content {
    @apply mb-0.5 mt-2 mx-0.5;
  }

</style>