<script setup lang="ts">
import { computed } from 'vue';


  const props = defineProps({
    list: {
      type: Object,
      required: true,
    }
  });

  const list = computed(() => props.list);

</script>

<template>
  {{ list }}
</template>