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

  const group = computed(() => props.group as IGroup);
  
</script>

<template>

  <UCollapsible v-model:open="open">

    <UButton
      :label="'Group: ' + group.title"
      color="neutral"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      block
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
    @apply gap-4 grid grid-cols-4 p-2;
  }

  .content {
    @apply mb-0.5 mt-2 mx-0.5;
  }

</style>