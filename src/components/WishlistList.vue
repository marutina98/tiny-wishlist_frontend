<script setup lang="ts">
  
  import * as v from 'valibot';

  import { computed, inject, reactive, ref } from 'vue';
  
  import type IAuth from '@/interfaces/auth.interface';
  import type IGroup from '@/interfaces/group.interface';

  import SApi from '@/services/api.service';
  import SHelpers from '@/services/helpers.service';

  import eventBusRefetch from '@/services/event-bus-refetch.service';

  const auth = inject('auth') as IAuth;
  const toast = useToast();

  const props = defineProps({
    list: {
      type: Object,
      required: true,
    }
  });

  // Forms

  const newGroupState = reactive({
    
  });

  const newGroupSchema = v.object({

  });

  const newItemState = reactive({

  });

  const newItemSchema = v.object({

  });

  const list = computed(() => props.list);
  const filteredGroups = computed(() => filterGroups(props.list.groups));
  const archivedGroups = computed(() => filteredGroups.value.archived);
  const activeGroups = computed(() => filteredGroups.value.active);

  // Groups for Select/Options

  const selectGroups = computed(() => {

    const _groups = props.list.groups as IGroup[];

    _groups.map((g: IGroup) => {
      g.label = g.title;
      return g;
    });

    return _groups;

  });

  // Modals

  const openModalDelete = ref(false);

  const toggleModalDelete = () => {
    openModalDelete.value = !openModalDelete.value;
  }

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

  const deleteList = async (id: string) => {
    
    // Get token from auth
    // Pass token to SApi
    // delete list and close modal

    const token = auth.getToken();

    const request = await SApi.deleteList(id, token);

    // show toast

    if (request.ok) {

      eventBusRefetch.emit(true);
      
      toast.add({
        title: 'List was deleted succesfully.',
        color: 'success'
      });

    } else {

      toast.add({
        title: 'List could not be deleted. Try again.',
        color: 'error'
      });

    }

    toggleModalDelete();

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

      <UModal v-model:open="openModalDelete">
        <UButton color="error" icon="i-system-uicons:trash" label="Delete List" />

        <template #content>
          <div class="modal">
            <div class="modal-content">
              Do you want to delete this list ?
            </div>
            <USeparator />
            <div class="modal-buttons">
              <UButton color="success" label="Yes" @click="deleteList(list.id)" />
              <UButton color="error" label="No" @click="toggleModalDelete" />
            </div>
          </div>
        </template>
      </UModal>

    </div>
  
    <div :class="{ groups: true, 'no-groups': list.groups.length <= 0 }">

      <!-- @todo: when no public/archived groups are present, show message -->

      <template v-if="list.groups.length > 0">
        <div class="groups-active">
          <div class="groups-active-header">
            <h2>Active Groups</h2>
          </div>
          <WishlistGroup :groups="list.groups" v-if="activeGroups.length > 0" :group v-for="group of activeGroups" :key="group.id" />
            <template v-else>
              <div class="groups no-groups">
                There are no active groups available.
              </div>
            </template>
        </div>
        
        <USeparator />

        <div class="groups-archived">
          <div class="groups-archived-header">
            <h2>Archived Groups</h2>
          </div>
          <WishlistGroup :groups="list.groups" v-if="archivedGroups.length > 0" :group v-for="group of archivedGroups" :key="group.id" />
          <template v-else>
            <div class="groups no-groups">
              There are no archived groups available.
            </div>
          </template>
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

  .groups-active-header,
  .groups-archived-header {
    @apply text-center mb-2 uppercase font-bold;
  }

  .modal-content,
  .modal-buttons {
    @apply p-2;
  }

  .modal-buttons {
    @apply flex flex-row gap-2 justify-center;
  }

  .modal-form-wrapper {
    @apply flex flex-col items-center p-4;
  }

</style>