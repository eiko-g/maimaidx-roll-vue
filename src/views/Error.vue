<template>
  <div class="error">
    <p>404 Page</p>
  </div>
</template>

<script>
export default {
  name: "Error",
};
</script>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
setTimeout(() => {
  router.push({ name: "Roll" });
}, 3000);
</script>

<style>
</style>
