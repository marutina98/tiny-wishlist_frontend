<script setup lang="ts">

  import { onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  onBeforeMount(() => {
    router.push({
      path: '/error/404'
    });
  });
  
</script>