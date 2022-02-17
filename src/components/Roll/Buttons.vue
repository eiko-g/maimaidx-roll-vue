<template>
  <div class="buttons">
    <button @click="rollSong()" :disabled="rollDisabled" class="button roll">按条件 Roll</button>
    <button @click="gotoSetting" class="button setting">设置</button>
    <!-- <button class="button random">随便来一首</button> -->
  </div>
</template>

<script>
export default {
  name: "Buttons",
};
</script>

<script setup>
import { toRefs, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  rollDisabled: Boolean
});
const emit = defineEmits(['rollClicked']);
const router = useRouter();

let { rollDisabled } = toRefs(props);

function gotoSetting() {
  router.push({ name: "Setting" });
}

function rollSong() {
  emit('rollClicked');
}

</script>

<style lang="scss" scoped>
@import "../../source/scss/mixin";
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