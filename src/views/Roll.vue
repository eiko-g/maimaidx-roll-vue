<template>
  <div class="roll">
    <Result :currentSong="currentSong" />
    <SettingInfo :setting="setting" />
    <Buttons @rollClicked="roll" :rollDisabled="rollDisabled" />

    <div class="footer">
      <p>ver 0.43dev-20220216.01</p>
    </div>
    <!-- .footer -->
  </div>
</template>

<script>
import shuffleArray from "../mixins/shuffleArray";

export default {
  name: "Roll",
  data() {
    return {
      notFirstRun: false,
      rollDisabled: true,
      setting: {},
      currentSong: {},
      currentDifficulty: "",
      originalSongList: [],
    };
  },
  methods: {
    roll() {
      console.log("Roll!");
      // 防误触
      this.rollDisabled = true;

      // let songList = this.$store.getters.getSongList;
      // console.log("歌单", songList);
      // shuffleArray(songList);
      // this.currentSong = songList[0];
      // console.log("抽到的歌", this.currentSong);
      // this.$store.commit("saveCurrentSong", this.currentSong);
      // this.activeRank();
      let 筛选后的歌单 = this.$store.getters.getSongList;
      console.log("筛选后的歌单", 筛选后的歌单);
      shuffleArray(筛选后的歌单);
      let 点指兵兵 = 筛选后的歌单[0];
      console.log("就是你了！", 点指兵兵);
      let 天选之歌 = this.originalSongList.曲目列表.filter((song) => {
        return song.id == 点指兵兵.id;
      })[0];
      console.log("天选之歌", 天选之歌);
      this.currentSong = 天选之歌;
      this.currentDifficulty = 点指兵兵.rank;
      this.$store.commit("saveCurrentSong", this.currentSong);
      this.$store.commit("saveCurrentDifficulty", this.currentDifficulty);

      setTimeout(() => {
        this.rollDisabled = false;
      }, 500);
    },
  },
  created() {
    this.currentSong = this.$store.getters.getCurrentSong;
  },
  mounted() {
    this.notFirstRun = this.$store.getters.getFirstRun;
    if (this.notFirstRun) {
      this.rollDisabled = false;
      this.setting = this.$store.getters.getSetting;
      console.log("Get setting", this.setting);
    }
    let songList = this.$store.getters.getOriginalSongList;
    if (!songList.data) {
      console.log("没载入到歌单，回去载入");
      this.$router.push({ name: "Loading" });
    } else {
      this.originalSongList = songList;
      console.log("原始歌单", this.originalSongList);
    }
  },
};
</script>

<script setup>
import Result from "../components/Roll/Result.vue";
import SettingInfo from "../components/Roll/SettingInfo.vue";
import Buttons from "../components/Roll/Buttons.vue";
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