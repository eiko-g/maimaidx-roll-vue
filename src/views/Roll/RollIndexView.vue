<template>
  <ResultBlock :currentSong="songlistStore.currentSong" :currentRank="songlistStore.currentRank"></ResultBlock>
  <SettingInfoBlock :setting="settingStore"></SettingInfoBlock>
  <RollButtons @rollClicked="roll" :buttonDisable="buttonDisable"></RollButtons>

  <div class="footer">
    <p>ver dev-20231010.01</p>
  </div>
</template>

<script setup lang="ts">
import { useSonglistStore } from '@/stores/songlist';
import { useSettingsStore } from '@/stores/settings';
import ResultBlock from '@/components/Roll/ResultBlock.vue';
import SettingInfoBlock from '@/components/Roll/SettingInfoBlock.vue';
import RollButtons from '@/components/Roll/RollButtons.vue';
import { ref } from 'vue';
import shuffleArray from '@/mixins/shuffleArray';

const songlistStore = useSonglistStore();
const settingStore = useSettingsStore();

let buttonDisable = ref(settingStore.isFirstRun);

function roll() {
  console.log('Roll!', new Date());
  buttonDisable.value = true;

  // !!AnyScript
  let rollSonglist: any = songlistStore.rollSonglist;

  shuffleArray(rollSonglist);

  let selectThis = rollSonglist[0];
  console.log('选到了这首歌：', selectThis);

  let selectedSong = songlistStore.originSonglist.find((song) => {
    return song.id === selectThis.id;
  });
  if (selectedSong !== undefined) {
    songlistStore.currentSong = selectedSong;
  } else {
    throw new Error('啥情况，怎么 roll 完了找不到歌？');
  }

  console.log('歌曲详情：', songlistStore.currentSong);
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
