<template>
  <div class="roll-buttons">
    <button
      class="button roll"
      @click="$emit('rollClicked')"
      :disabled="buttonDisable"
    >
      按条件 Roll
    </button>
    <button @click="gotoSetting" class="button setting">设置</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
defineProps<{
  buttonDisable: boolean;
}>();
defineEmits(["rollClicked"]);
function gotoSetting() {
  router.push({ name: "rollSetting" });
}
</script>

<style scoped lang="scss">
@import "@/style/mixin";
button {
  display: block;
  background-color: transparent;
  border: 0;
  width: 100%;
  max-width: 300px;
  margin: 20px auto 30px;
  padding: 5px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  border-radius: 99em;
  cursor: pointer;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &.roll {
    @include bxsh();
    @include txsh();
  }
  &.setting {
    @include bxsh(#f48605, #ffd21f, #f48605);
    @include txsh(#f48605);
  }
  &.random {
    background-color: #f6b32c;
    border: 3px solid #e17400;
    @include txsh(#e17400);
  }
}
</style>
