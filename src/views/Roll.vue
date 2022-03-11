<template>
  <div class="roll">
    <Result :currentSong="currentSong" />
    <SettingInfo :setting="setting" />
    <Buttons @rollClicked="roll" :rollDisabled="rollDisabled" />

    <div class="footer">
      <p>ver 0.43-20220312.02</p>
    </div>
    <!-- .footer -->
  </div>
</template>

<script>
export default {
  name: "Roll",
};
</script>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Result from "../components/Roll/Result.vue";
import SettingInfo from "../components/Roll/SettingInfo.vue";
import Buttons from "../components/Roll/Buttons.vue";

import shuffleArray from "../mixins/shuffleArray.js";

const store = useStore();
const router = useRouter();

let
  notFirstRun = ref(false),
  rollDisabled = ref(true),
  setting = reactive({}),
  currentSong = ref({}),
  currentDifficulty = ref(''),
  originalSongList = reactive([]);

notFirstRun.value = store.getters.getFirstRun;
currentSong.value = store.getters.getCurrentSong;

if (notFirstRun.value) {
  rollDisabled.value = false;
}
setting = store.getters.getSetting;
console.log("获取设置", setting);

let songList = store.getters.getOriginalSongList;
if (!songList.data) {
  console.log("没载入到歌单，回去载入");
  router.push({ name: "Loading" });
} else {
  originalSongList = songList;
  console.log("原始歌单", originalSongList);
}

function roll() {
  console.log("Roll!");
  // 防误触
  rollDisabled.value = true;

  let 筛选后的歌单 = store.getters.getSongList;
  console.log("筛选后的歌单", 筛选后的歌单);
  shuffleArray(筛选后的歌单);
  let 点指兵兵 = 筛选后的歌单[0];
  console.log("就是你了！", 点指兵兵);
  let 天选之歌 = originalSongList.曲目列表.filter((song) => {
    return song.id === 点指兵兵.id;
  })[0];
  console.log("天选之歌", 天选之歌);
  currentSong.value = 天选之歌;
  currentDifficulty.value = 点指兵兵.rank;
  store.commit("saveCurrentSong", currentSong);
  store.commit("saveCurrentDifficulty", currentDifficulty.value);

  console.log('currentSong', currentSong, 点指兵兵.rank);

  setTimeout(() => {
    rollDisabled.value = false;
  }, 500);
}
</script>


<style lang="scss" scoped>
.setting-info {
  .rank {
    span {
      font-size: 24px;
    }
  }
}
.footer {
  color: #666;
  font-size: 12px;
  text-align: center;
}
</style>