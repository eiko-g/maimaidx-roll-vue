<template>
  <h3>Custom - Add</h3>
  <label for="list-name">
    <p class="label-text">歌单名称</p>
    <input type="text" id="list-name" name="list-name" class="label-input-text" required>
  </label>
  <p class="tips">稍后再从别的地方添加歌曲。</p>
  <button class="save" @click="save">保存</button>
</template>

<script lang="ts" setup>
function save() {
  let input = document.getElementById('list-name');
  let inputValue = (input as HTMLInputElement).value;
  if ((inputValue.trim()).length == 0) {
    console.log('No')
  } else {
    console.log('Yes', inputValue);
  }
}
</script>

<style lang="scss" scoped></style>