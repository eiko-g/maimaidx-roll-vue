<template>
  <ResultBlock :currentSong="songlistStore.currentSong" :currentRank="songlistStore.currentRank"></ResultBlock>
  <SettingInfoBlock :setting="settingStore"></SettingInfoBlock>
  <RollButtons @rollClicked="roll" :buttonDisable="buttonDisable"></RollButtons>

  <div class="footer">
    <p>ver {{ version }}</p>
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
import type ISongRollList from "@/interface/ISongRollList";

const songlistStore = useSonglistStore();
const settingStore = useSettingsStore();

const buttonDisable = ref(settingStore.isFirstRun);

const version = '0.7.0-20250726.01';

function roll() {
  console.log("Roll!", new Date());
  buttonDisable.value = true;

  const rollSonglist:ISongRollList[] = songlistStore.rollSonglist;

  shuffleArray(rollSonglist);

  const selectThis = rollSonglist[0];
  console.log("选到了这首歌：", selectThis);

  const selectedSong = songlistStore.originSonglist.find((song) => {
    return song.id === selectThis.id;
  });
  if (selectedSong !== undefined) {
    songlistStore.currentSong = selectedSong;
  } else {
    alert('我去，Roll 歌炸了！');
    throw new Error('啥情况，怎么 roll 完了找不到歌？');
  }

  console.log("歌曲详情：", songlistStore.currentSong);
  songlistStore.currentRank = selectThis.difficult;

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
