<template>
  <h3 class="title">Error page</h3>
  <img class="error-img" src="/assets/img/404.png" alt="哇咔啦奶" />
  <p>没有这个页面捏，等下跳转回 Roll 歌页面捏</p>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

setTimeout(() => {
  router.push({ name: "roll" });
}, 3000);
</script>

<style scoped lang="scss">
.title {
  font-size: 24px;
  text-align: center;
  color: #999;
  text-transform: uppercase;
}
.error-img {
  display: block;
  width: 200px;
  height: 200px;
  margin: 20px auto;
}
p {
  text-align: center;
}
</style>
