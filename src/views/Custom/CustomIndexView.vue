<template>
  <h2 class="main-title">自定义抽歌歌单</h2>
  <div class="custom-list">
    <div class="custom-block add" @click="show = true">
      <p>添加新的歌单</p>
    </div>
  </div>

  <Teleport to="body">
    <AddList :show="show" @close="show = false"></AddList>
  </Teleport>
</template>

<script lang="ts" setup>
import AddList from '@/components/Custom/AddList.vue';
import { ref } from 'vue';

let show = ref(false);
</script>

<style lang="scss" scoped>
.main-title {
  color: var(--color-border);
  font-size: 24px;
  line-height: 1.5;
  margin: 0;
  text-align: center;
}

.custom-list {
  margin: 30px auto;

  .custom-block {
    text-align: center;
    border: 3px solid #ccc;
    padding: 10px;

    p {
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }

    &:hover {
      border-color: var(--color-border);
      cursor: pointer;
    }

    &.add {
      font-size: 20px;
    }
  }
}
</style>