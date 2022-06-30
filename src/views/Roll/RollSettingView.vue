<template>
  <div class="setting">
    <h2 class="main-title">抽歌设置</h2>
    <RankBlock></RankBlock>
    <CategoryBlock></CategoryBlock>
    <LevelBlock></LevelBlock>
    <VersionBlock></VersionBlock>

    <button class="save" @click="backToRoll">保存设置</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useSettingsStore } from "@/stores/settings";
import { useSonglistStore } from "@/stores/songlist";

import RankBlock from "@/components/Setting/RankBlock.vue";
import CategoryBlock from "@/components/Setting/CategoryBlock.vue";
import LevelBlock from "@/components/Setting/LevelBlock.vue";
import VersionBlock from "@/components/Setting/VersionBlock.vue";

import songFilter from "@/mixins/songFilter";

const router = useRouter();
const store = useSettingsStore();
const songlistStore = useSonglistStore();

function backToRoll() {
  console.log('点击了保存设置');
  
  store.isFirstRun = false;

  // !!AnyScript
  let tempSonglist: any = songFilter(songlistStore.originSonglist, store);

  if (tempSonglist.length > 0) {
    songlistStore.rollSonglist = tempSonglist;
    console.log("生成的歌单：", songlistStore.rollSonglist);
    console.log("从设置界面回到 Roll 歌界面");
    router.push({ name: "roll" });
  } else {
    console.warn("歌单没筛出来东西");
    alert("筛选后的歌单为空，请检查设置");
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/mixin";
.main-title {
  color: var(--color-border);
  font-size: 24px;
  line-height: 1.5;
  margin: 0;
  text-align: center;
}
.setting :deep(.setting-block) {
  .title {
    font-size: 18px;
    line-height: 1.5;
    margin: 0.5em 0;
  }
  .tip {
    color: #666;
    font-size: 14px;
  }
}

.save {
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 30px auto;
  padding: 5px;
  border: 0;
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  border-radius: 99em;
  cursor: pointer;
  @include bxsh();
  @include txsh(#319df8);
}
</style>
