<template>
  <Transition name="add">
    <div class="custom-list-add" v-if="props.show">
      <div class="content">
        <h3 class="title">添加新的歌单</h3>
        <input type="text" class="input-list-name" required>
        <button class="add" @click="$emit('close')">添加</button>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const props = defineProps({ show: Boolean });
</script>

<style lang="scss" scoped>
.custom-list-add {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(#fff, .8);
  backdrop-filter: blur(3px);

  .content {
    max-width: 500px;
    margin: 50px auto;
    padding: 30px;
    background-color: #fff;
  }
}
</style>