<script setup lang="ts">
import type IGroup from '@/interfaces/group.interface';
import { computed } from 'vue';


  const props = defineProps({
    list: {
      type: Object,
      required: true,
    }
  });

  const list = computed(() => props.list);

  // Filter Groups by their archival status
  
  const filterGroups = (_groups: IGroup[]) => {

    const groups: {
      active: IGroup[];
      archived: IGroup[]
    } = {
      active: [],
      archived: [],
    }

    for (let group of _groups) {
      const arrName = group.archived ? 'archived' : 'active';
      groups[arrName as keyof typeof groups].push(group);
    }

    return groups;

  }

</script>

<template>

  <div class="list">

    <div class="settings">

      <UModal>
        <UButton icon="i-system-uicons:plus-circle" label="Create Group" />

        <template #content>
          <!-- @todo: create a group form -->
        </template>
      </UModal>

      <UModal>
        <UButton icon="i-system-uicons:plus-circle" label="Add Item" />

        <template #content>
          <!-- @todo: create a item form -->
        </template>
      </UModal>
    </div>
  
    <div :class="{ groups: true, 'no-groups': list.groups.length <= 0 }">

      <template v-if="list.groups.length > 0">
        <div class="groups-active">

          <div class="groups-active-header">
            <h2>Active Groups</h2>
          </div>

          <div v-for="group of filterGroups(list.groups).active" class="group" :key="group.id">
            <UCollapsible>
              
              <div class="group-buttons">
                <UButton
                  :label="group.title"
                  color="neutral"
                  variant="subtle"
                  trailing-icon="i-lucide-chevron-down"
                  block
                />

                <UButton label="Archive Group" />

                <UButton label="Delete" />
              </div>

              <template #content>
                {{ group }}
              </template>
            </UCollapsible>
          </div>
        </div>
        
        <USeparator />

        <div class="groups-archived">

          <div class="groups-archived-header">
            <h2>Archived Groups</h2>
          </div>

          <div v-for="group of filterGroups(list.groups).archived" class="group" :key="group.id">
            <UCollapsible>
              
              <div class="group-buttons">
                <UButton
                  :label="group.title"
                  color="neutral"
                  variant="subtle"
                  trailing-icon="i-lucide-chevron-down"
                  block
                />

                <UButton label="Make Group Active" />

                <UButton label="Delete" />
              </div>

              <template #content>
                {{ group }}
              </template>
            </UCollapsible>
          </div>
        </div>
      </template>

      <template v-else>
        There are no groups present in this list.
      </template>
    </div>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .list {
    @apply flex flex-col gap-4;
  }

  .settings {
    @apply flex gap-2 justify-end;
  }

  .groups {
    @apply flex flex-col gap-4;
  }

  .groups-active,
  .groups-archived {
    @apply flex flex-col gap-2;
  }

  .groups.no-groups {
    @apply text-center text-sm p-2;
  }

  .group-buttons {
    @apply flex gap-2;
  }

  .groups-active-header,
  .groups-archived-header {
    @apply text-center mb-2 uppercase font-bold;
  }

</style>