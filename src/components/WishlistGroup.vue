<script setup lang="ts">

  import { computed, ref, inject } from 'vue';

  import type IGroup from '@/interfaces/group.interface';
  import type IAuth from '@/interfaces/auth.interface';

  import SApi from '@/services/api.service';
  import eventBusRefetch from '@/services/event-bus-refetch.service';

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

  const open = ref(false);
  const group = computed(() => props.group as IGroup);

  const toast = useToast();
  
  const toggleCollapsible = () => {
    open.value = !open.value;
  }

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

  const deleteItem = (id: string) => {
    console.log('delete item');
  }

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

      <UButton @click="deleteItem(group.id)" label="Delete" />

    </div>

    <UCollapsible v-model:open="open">
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

</style>