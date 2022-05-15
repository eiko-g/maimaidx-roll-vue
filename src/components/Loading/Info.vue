<template>
  <li class="info">
    <p>[{{ info!.time }}] {{ info!.msg }}</p>
  </li>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps({
  info: Object,
});
let { info } = toRefs(props);
</script>

<style lang="scss" scoped>
.info {
  font-size: 14px;
  padding: 0.5em 0;
  &:not(:last-child) {
    border-bottom: 1px dashed #ccc;
  }

  p {
    font-family: monospace;
    margin: 0;
    line-height: 1.5;
  }
}
</style>
