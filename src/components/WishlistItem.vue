<script setup lang="ts">

  import * as v from 'valibot';

  import { computed, ref, inject, reactive } from 'vue';

  import SApi from '@/services/api.service';
  import SHelpers from '@/services/helpers.service';

  import type IItem from '@/interfaces/item.interface';
  import type IAuth from '@/interfaces/auth.interface';
  import type IGroup from '@/interfaces/group.interface';

  const auth = inject('auth') as IAuth;
  const toast = useToast();

  const props = defineProps({
    item: {
      type: Object,
      required: true
    },
    groups: {
      type: Array,
      required: true,
    }
  });

  const item = computed(() => props.item as IItem);
  const groups = computed(() => props.groups as IGroup[]);

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
    thumbnail: new File([], ''),
    url: '',
    quantity: 0,
    price: 0,
    archived: false,
    reserved: false,
    groupId: '',
  });

  const editSchema = v.object({
    title: v.pipe(v.string()),
    description: v.pipe(v.string()),
    thumbnail: v.pipe(
      v.file()
    ),
    url: v.pipe(
      v.string(),
      v.url(),
    ),
    quantity: v.pipe(v.number()),
    price: v.pipe(
      v.number(),
      v.minValue(0),
      v.transform(value => parseFloat(value.toFixed(2)))
    ),
    archived: v.pipe(v.boolean()),
    reserved: v.pipe(v.boolean()),
    groupId: v.pipe(v.string())
  })

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

  // const blob = new Blob([file], { type: file.type })

  const setEditModal = async (item: IItem) => {

    const thumbnailBlob = await SHelpers.dataURLToBlob(item.thumbnail) as Blob;
    const thumbnailFile = new File([thumbnailBlob], 'thumbnail');

    editState.thumbnail = thumbnailFile;
    editState.title = item.title;
    editState.description = item.description;
    editState.url = item.url;
    editState.price = parseFloat(item.price);
    editState.quantity = item.quantity;
    editState.archived = item.archived;
    editState.reserved = item.reserved;
    editState.groupId = item.groupId;
    
    console.log(editState);

  }

  const handleThumbnailChange = (event: Event) => {

    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      editState.thumbnail = target.files[0];
    }

    // @todo: move in submit

    // const file = editState.thumbnail;
    // const blob = new Blob([file], { type: file.type });

    // console.log(SHelpers.blobToDataURL(
    //   blob,
    //   (data: string) => {
    //     console.log(data)
    //   }
    // ))

  };
  
  const editItem = () => {

    console.log(groups.value);

    console.log('edit');

  }

</script>

<template>

  <div class="item">

    <div class="item-header" :style="css">

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
              <div class="modal-form-wrapper">

                <UForm class="edit-form" :schema="editSchema" :state="editState">

                  <UFormField label="Title" name="title">
                    <UInput v-model="editState.title" type="text"/>
                  </UFormField>

                  <UFormField label="Description" name="description">
                    <UInput v-model="editState.description" type="text"/>
                  </UFormField>

                  <UFormField label="Thumbnail" name="thumbnail">
                    <UInput @change="handleThumbnailChange" type="file" />
                  </UFormField>

                  <UFormField label="URL" name="url">
                    <UInput v-model="editState.url" type="text" />
                  </UFormField>

                  <UFormField label="Quantity" name="quantity">
                    <UInput v-model="editState.quantity" type="number" />
                  </UFormField>

                  <UFormField label="Price" name="price">
                    <UInput v-model="editState.price" type="number" />
                  </UFormField>

                  <UFormField label="Archival Status" name="archived">
                    <UCheckbox v-model="editState.archived" label="Archived" />
                  </UFormField>

                  <UFormField label="Reservation Status" name="reserved">
                    <UCheckbox v-model="editState.reserved" label="Reserved" />
                  </UFormField>

                </UForm>

              </div>
            </template>
          </UModal>
        </div>
      </div>

      <div v-if="item.archived || item.reserved" class="item-status">
        <span v-if="item.archived" class="item-archived">
          Archived
        </span>

        <span v-if="item.reserved" class="item-reserved">
          Reserved
        </span>
      </div>
        
    </div>

    <div class="item-info">
      <div class="item-info-row">
        <div class="item-title">{{ item.title }}</div>
        <div class="item-description">{{ item.description }}</div>
      </div>
      <div class="item-info-row item-info-row-grid">
        <div class="item-quantity">{{ item.quantity }}</div>
        <div class="item-price">{{ item.price }}</div>
      </div>
    </div>
    
  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .item {
    @apply flex flex-col gap-2;
  }

  .item-header {
    @apply flex flex-col justify-between;
    background-image: var(--background-image);
    height: 300px;
  }

  .item-status {
    @apply flex justify-center gap-2 w-full p-2;
  }

  .item-info {
    @apply flex flex-col gap-2;
  }

  .item-info-row-grid {
    @apply grid grid-cols-2 gap-2 text-center;
  }

  .item-title,
  .item-description,
  .item-archived,
  .item-reserved,
  .item-price,
  .item-quantity {
    @apply bg-stone-50 p-2 text-sm;
  }

  .item-title {
    @apply font-bold truncate;
  }

  .item-description {
    @apply italic;
  }

  :is(
    .item-price,
    .item-quantity
  )::before {
    @apply uppercase underline mr-1;
  }

  .item-price::before {
    content: 'Price';
  }

  .item-quantity::before {
    content: 'Quantity';
  }

  .item-settings {
    @apply flex justify-between gap-2 w-full p-2;
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

  .edit-form {
    @apply flex flex-col gap-2;
  }

</style>