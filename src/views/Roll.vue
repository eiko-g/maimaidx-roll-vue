<template>
  <div class="roll">
    <Result :currentSong="currentSong" />
    <SettingInfo :setting="setting" />
    <Buttons @rollClicked="roll" :rollDisabled="rollDisabled" />

    <div class="footer">
      <p>ver 0.40BETA-20211027.01</p>
    </div>
    <!-- .footer -->
  </div>
</template>

<script>
import Result from "../components/Roll/Result.vue";
import SettingInfo from "../components/Roll/SettingInfo.vue";
import Buttons from "../components/Roll/Buttons.vue";
import shuffleArray from "../mixins/shuffleArray";
import mess from "../mixins/mess";

export default {
  name: "Roll",
  data() {
    return {
      notFirstRun: false,
      rollDisabled: true,
      setting: {},
      currentSong: {},
      currentDiffculty: "",
    };
  },
  components: {
    Result,
    SettingInfo,
    Buttons,
  },
  methods: {

    roll() {
      console.log("Roll!");
      // 防误触
      this.rollDisabled = true;
      let songList = this.$store.getters.getSongList;
      console.log("歌单", songList);
      shuffleArray(songList);
      this.currentSong = songList[0];
      console.log("抽到的歌", this.currentSong);
      this.$store.commit("saveCurrentSong", this.currentSong);
      this.activeRank();
      setTimeout(() => {
        this.rollDisabled = false;
      }, 300);
    },
    activeRank() {
      let setting = this.$store.getters.getSetting;
      let 要展示的难度 = "",
        tempArr = [];

      let fullRank = [];
      if (setting.rank.includes("all")) {
        fullRank = ["B", "A", "E", "M", "R"];
      } else {
        fullRank = setting.rank;
      }
      // 想办法弄出抽的是哪个难度
      fullRank.forEach((难度) => {
        console.log(setting)
        // 判断这首歌的等级所对应的难度合不合适
        // console.log(this.currentSong.等级[难度]);
        if (mess(this.currentSong.等级[难度], setting)) {
          // 合适就塞数组里
          // console.log("塞进去了");
          tempArr.push(难度);
        }
      });
      console.log("临时数组：", tempArr);
      shuffleArray(tempArr);
      要展示的难度 = tempArr[0];
      console.log("要展示的难度", 要展示的难度);
      this.currentDiffculty = 要展示的难度;
      this.$store.commit("saveCurrentDiffculty", 要展示的难度);
    }
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
    }
  },
};
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