<script setup lang="ts">

  import * as v from 'valibot';

  import { computed, ref, inject, reactive } from 'vue';

  import SApi from '@/services/api.service';
  import SHelpers from '@/services/helpers.service';

  import type IItem from '@/interfaces/item.interface';
  import type IAuth from '@/interfaces/auth.interface';

  const auth = inject('auth') as IAuth;
  const toast = useToast();

  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  });

  const item = computed(() => props.item as IItem);
  const css = computed(() => {
    const thumbnail = props.item.thumbnail ?? SHelpers.getPlaceholderImage();
    return {
      '--background-image': `url(${thumbnail})`
    };
  });

  // Edit Form

  const editState = reactive({
    title: '',
    description: '',
    thumbnail: '',
    url: '',
    quantity: 0,
    price: 0,
    archived: false,
    reserved: false,
    groupId: '',
  });

  // Modal Status

  const openModalDelete = ref(false);
  const openModalEdit = ref(false);

  const toggleModalDelete = () => {
    openModalDelete.value = !openModalDelete.value;
  }

  const toggleModalEdit = () => {
    openModalEdit.value = !openModalEdit.value;
  }

  // Delete Item
  
  const deleteItem = async (id: string) => {
    
    // Get token from auth
    // Pass token to SApi
    // delete item and close modal

    const token = auth.getToken();

    const request = await SApi.deleteItem(id, token);

    // show toast
    // @todo: send emit to fetch list again

    if (request.ok) {

      // @todo: emit here
      
      toast.add({
        title: 'Item was deleted succesfully.',
        color: 'success'
      });

    } else {

      toast.add({
        title: 'Item could not be deleted. Try again.',
        color: 'error'
      });

    }

    toggleModalDelete();

  }

  // Edit Item

  // Set editStatus

  const setEditModal = (item: IItem) => {

    editState.thumbnail = item.thumbnail;
    editState.title = item.title;
    editState.description = item.description;
    editState.url = item.url;
    editState.price = item.price;
    editState.quantity = item.quantity;
    editState.archived = item.archived;
    editState.reserved = item.reserved;
    editState.groupId = item.groupId;
    
    console.log(editState);

  }
  
  const editItem = () => {

    console.log('edit');

  }

</script>

<template>

  <div class="item" :style="css">
    <div class="item-info">
      <div class="item-info-top">
        <div class="item-title">
          {{ item.title }}
        </div>
        <div class="item-description">
          {{ item.description }}
        </div>
      </div>
      <div class="item-info-center">

      </div>
      <div class="item-info-bottom">
        <div class="item-quantity">
          {{ item.quantity }}
        </div>
        <div class="item-price">
          {{ item.price }}
        </div>
      </div>
    </div>
    <div class="item-settings">
      <div class="item-delete">
        <UModal v-model:open="openModalDelete">
          <UButton icon="i-system-uicons:trash" color="error" />
          <template #content>
            <div class="modal">
              <div class="modal-content">
                Do you want to delete this item ?
              </div>
              <USeparator />
              <div class="modal-buttons">
                <UButton color="success" label="Yes" @click="deleteItem(item.id)" />
                <UButton color="error" label="No" @click="toggleModalDelete" />
              </div>
            </div>
          </template>
        </UModal>
      </div>
      <div class="item-edit">
        <UModal v-model:open="openModalEdit">
          <UButton @click="setEditModal(item)" icon="i-system-uicons:pen" color="success" />
          <template #content>
            Edit
          </template>
        </UModal>
      </div>
    </div>
  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .item {
    @apply p-4 relative;
  }

  .item-info {
    @apply flex flex-col aspect-square p-2 gap-2 justify-between;
    background-image: var(--background-image);
    background-position: center center;
    background-size: cover;
  }

  .item-info-top,
  .item-info-center {
    @apply flex flex-col gap-2;
  }

  .item-info-bottom {
    @apply flex flex-row justify-between;
  }

  .item-title,
  .item-description,
  .item-quantity,
  .item-price {
    @apply bg-white p-2 text-sm truncate;
  }

  :is(
    .item-title,
    .item-description,
    .item-quantity
  )::before {
    @apply uppercase underline mr-0.5;
  }

  .item-title::before {
    content: 'Title';
  }

  .item-description::before {
    content: 'Description';
  }

  .item-quantity::before {
    content: 'Quantity';
  }

  .item-price::before {
    @apply mr-0.5;
    content: '€';
  }

  .item-settings {
    @apply flex justify-between absolute h-full w-full top-0 left-0;
  }

  .modal-content,
  .modal-buttons {
    @apply p-2;
  }

  .modal-buttons {
    @apply flex flex-row gap-2 justify-center;
  }

</style>