<template>
  <div class="setting-info">
    <p>
      <b>抽选等级：</b>
      [<span class="rank"> {{ getRank }} </span>]
      <span class="lv">{{ getLv }}</span>
    </p>
    <p>
      <b>抽选分类：</b>
      <span class="category">{{ getCat }}</span>
    </p>
    <p>
      <b>抽选版本：</b>
      <span class="version">{{ getVer }}</span>
    </p>
    <p>
      <b>抽选歌单：</b>
      <span class="songlist">ver.CH1.11-C</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "SettingInfo",
  props: ["setting"],
  data() {
    return {};
  },
  computed: {
    getRank() {
      if (this.setting.rank) {
        return this.setting.rank;
      } else {
        return "难度";
      }
    },
    getLv() {
      if (this.setting.lv) {
        return this.setting.lv;
      } else {
        return "等级";
      }
    },
    getCat() {
      if (this.setting.cat) {
        return this.setting.cat;
      } else {
        return "全分类";
      }
    },
    getVer() {
      if (this.setting.version) {
        return this.setting.version;
      } else {
        return "全版本";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.setting-info {
  color: #333;
  font-size: 12px;
  text-align: center;
}
</style>