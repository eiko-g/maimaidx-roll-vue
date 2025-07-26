<template>
  <div class="setting-block version">
    <h3 class="title">版本选择</h3>
    <div class="versions">
      <label for="version-all" class="version-label all">
        <input type="checkbox" name="版本" id="version-all" value="all" class="version all" />
        <div class="inner">全部</div>
      </label>

      <template
        v-for="item in songlistStore.version as IVersion[]"
        :key="`setting-version-${item.id}`"
      >
        <label :for="`version-${item.id}`" :class="['version-label', item.name]">
          <input
            type="checkbox"
            name="version"
            :id="`version-${item.id}`"
            :value="item.id"
            class="version"
          />
          <div class="inner">{{ item.name }}</div>
        </label>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type IVersion from '@/interface/IVersion';
import { checkAll, checkOthers } from '@/mixins/checkInput';
import { useSettingsStore } from '@/stores/settings';
import { useSonglistStore } from '@/stores/songlist';
import { onMounted } from 'vue';
const setttingStore = useSettingsStore();
const songlistStore = useSonglistStore();

// 保存版本设置
function saveVersion() {
  const elements = document.querySelectorAll('input.version:checked'),
    tempVer: Array<string> = [];
  elements.forEach((item) => {
    tempVer.push((item as HTMLInputElement).value);
  });
  setttingStore.version = tempVer;
}

onMounted(() => {
  //#region 版本选择事件
  // 非 all 版本
  document.querySelectorAll('input.version:not(input.version.all)').forEach((item) => {
    item.addEventListener('click', () => {
      checkOthers('input.version', 'input.version.all');
    });
  });

  // all 版本
  document.querySelector('input.version.all')!.addEventListener('click', () => {
    checkAll('input.version', 'input.version.all');
  });

  // 所有版本选项
  document.querySelectorAll('input.version').forEach((item) => {
    (item as HTMLInputElement).addEventListener('change', (el) => {
      console.log('Version changed: ', el);
      saveVersion();
    });

    // 载入时勾上保存的版本
    (item as HTMLInputElement).checked = setttingStore.version.includes(
      (item as HTMLInputElement).value,
    );
  });
});
</script>

<style scoped lang="scss">
@use '@/style/mixin';

.versions {
  display: flex;
  flex-wrap: wrap;

  .version-label {
    user-select: none;
    margin-bottom: 10px;

    &:not(:last-child) {
      margin-right: 10px;
    }

    &:hover {
      cursor: pointer;
    }

    input[type='checkbox'] {
      display: none;
    }

    .inner {
      display: block;
      border: 3px solid #ccc;
      padding: 5px;
    }

    @include mixin.input-label();
  }
}
</style>
