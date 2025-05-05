<script setup lang="ts">

  import * as v from 'valibot';

  import { computed, ref, inject, reactive, toRaw, onBeforeMount } from 'vue';

  import type IGroup from '@/interfaces/group.interface';
  import type IAuth from '@/interfaces/auth.interface';

  import SApi from '@/services/api.service';
  import eventBusRefetch from '@/services/event-bus-refetch.service';
import type IRequestPutGroup from '@/interfaces/request-put-group.interface';

  const auth = inject('auth') as IAuth;

  // I need to pass the groups of the list to the props
  // to then pass it to wishlistItem for the update

  const props = defineProps({
    group: {
      required: true,
      type: Object
    },
    groups: {
      required: true,
      type: Array
    }
  });

  const openModalEdit = ref(false);
  const openModalDelete = ref(false);

  const openCollapsible = ref(false);

  const group = computed(() => props.group as IGroup);

  const toast = useToast();
  
  const toggleModalEdit = () => {
    openModalEdit.value = !openModalEdit.value;
  }
  
  const toggleModalDelete = () => {
    openModalDelete.value = !openModalDelete.value;
  }
  
  const toggleCollapsible = () => {
    openCollapsible.value = !openCollapsible.value;
  }

  // Form State and Schema

  const state = reactive({
    title: '',
  });

  const schema = v.object({
    title: v.pipe(
      v.string('Title must be a string'),
      v.minLength(3, 'Title must be at least 3 characters long.'),
    )
  });

  // Update/Delete

  const changeStatus = async (id: string) => {
    
    // Get token from auth
    // Pass token to SApi
    // update archival status

    const token = auth.getToken();

    const request = await SApi.putGroupArchivalStatus(id, token);

    // show toast

    if (request.ok) {

      eventBusRefetch.emit(true);
      
      toast.add({
        title: 'The status of the group was updated succesfully.',
        color: 'success'
      });

    } else {

      toast.add({
        title: 'The status of the group could not be updated. Try again.',
        color: 'error'
      });

    }

  }

  const deleteGroup = async (id: string) => {
    
    // Get token from auth
    // Pass token to SApi
    // delete group and close modal

    const token = auth.getToken();

    const request = await SApi.deleteGroup(id, token);

    // show toast

    if (request.ok) {

      eventBusRefetch.emit(true);
      
      toast.add({
        title: 'Group was deleted succesfully.',
        color: 'success'
      });

    } else {

      toast.add({
        title: 'Group could not be deleted. Try again.',
        color: 'error'
      });

    }

    toggleModalDelete();

  }

  const putGroup = async () => {

    const data: IRequestPutGroup = {
      id: group.value.id,
      title: state.title,
    };

    // Get token from auth
    // Pass token to SApi
    // update group and close modal

    const token = auth.getToken();

    const request = await SApi.putGroup(data, token);

    // show toast

    if (request.ok) {

      eventBusRefetch.emit(true);
      
      toast.add({
        title: 'Group was updated succesfully.',
        color: 'success'
      });

    } else {

      toast.add({
        title: 'Group could not be updated. Try again.',
        color: 'error'
      });

    }

    toggleModalEdit();

  }

  // Set state with group data

  onBeforeMount(() => {
    state.title = group.value.title;
  });

</script>

<template>
  
  <div class="group">

    <div class="group-buttons">

      <UButton
        :label="group.title"
        color="neutral"
        variant="subtle"
        trailing-icon="i-lucide-chevron-down"
        block @click="toggleCollapsible"
      />

      <UButton @click="changeStatus(group.id)"
               :label="group.archived ? 'Make Group Active' : 'Archive Group'" />

      <UModal v-model:open="openModalEdit">
        <UButton icon="i-system-uicons:pen" color="success" />
        <template #content>
          <UForm class="list-form" :schema :state @submit.prevent="putGroup">

            <UFormField label="Title" name="title">
              <UInput v-model="state.title" type="text"/>
            </UFormField>

            <UButton type="submit" label="Submit" />

          </UForm>
        </template>
      </UModal>

      <UModal v-model:open="openModalDelete">
        <UButton icon="i-system-uicons:trash" color="error" />
        <template #content>
          <div class="modal">
            <div class="modal-content">
              Do you want to delete this group ?
            </div>
            <USeparator />
            <div class="modal-buttons">
              <UButton color="success" label="Yes" @click="deleteGroup(group.id)" />
              <UButton color="error" label="No" @click="toggleModalDelete" />
            </div>
          </div>
        </template>
      </UModal>

    </div>

    <UCollapsible v-model:open="openCollapsible">
      <template #content>
        <template v-if="group.items.length > 0">
          <div class="items">
            <WishlistItem :groups :item v-for="item of group.items" :key="item.id" />
          </div>
        </template>
        <template v-else>
          <div class="items no-items">
            There are no items present in this group.
          </div>
        </template>
      </template>
    </UCollapsible>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .group-buttons {
    @apply flex flex-row gap-2;
  }

  .items:not(.no-items) {
    @apply gap-4 grid grid-cols-4 p-2;
  }

  .items.no-items {
    @apply text-center text-sm p-2;
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