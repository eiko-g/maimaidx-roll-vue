<template>
  <ResultBlock :currentSong="songlistStore.currentSong" :currentRank="songlistStore.currentRank"></ResultBlock>
  <SettingInfoBlock :setting="settingStore"></SettingInfoBlock>
  <RollButtons @rollClicked="roll" :buttonDisable="buttonDisable"></RollButtons>

  <div class="footer">
    <p>ver 0.6.0dev-20230323.01</p>
  </div>
</template>

<script setup lang="ts">
import { useSonglistStore } from "@/stores/songlist";
import { useSettingsStore } from "@/stores/settings";
import ResultBlock from "@/components/Roll/ResultBlock.vue";
import SettingInfoBlock from "@/components/Roll/SettingInfoBlock.vue";
import RollButtons from "@/components/Roll/RollButtons.vue";
import { ref } from "vue";
import shuffleArray from "@/mixins/shuffleArray";

const songlistStore = useSonglistStore();
const settingStore = useSettingsStore();

let buttonDisable = ref(settingStore.isFirstRun);

function roll() {
  console.log("Roll!", new Date());
  buttonDisable.value = true;

  // !!AnyScript
  let rollSonglist: any = songlistStore.rollSonglist;

  shuffleArray(rollSonglist);

  let selectThis = rollSonglist[0];
  console.log("选到了这首歌：", selectThis);

  // 这里用 find 效率肯定更高，但是可能会返回 undefined
  // https://stackoverflow.com/questions/54738221/typescript-array-find-possibly-undefined
  // 虽然有解决方法，但是看不懂 desu
  songlistStore.currentSong = songlistStore.originSonglist.filter((song) => {
    return song.id === selectThis.id;
  })[0];
  console.log("歌曲详情：", songlistStore.currentSong);
  songlistStore.currentRank = selectThis.rank;

  setTimeout(() => {
    buttonDisable.value = false;
  }, 500);
}
</script>

<style scoped lang="scss">
.footer {
  color: #666;
  font-size: 12px;
  text-align: center;
}
</style>
