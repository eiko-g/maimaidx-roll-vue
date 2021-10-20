<template>
  <div class="setting">
    <h2 class="main-title">抽歌设置</h2>
    <Rank />
    <Category />
    <Level />
    <Version />
    <button class="save" @click="backToRoll">保存设置</button>
  </div>
</template>

<script>
import Category from "../components/Setting/Category.vue";
import Level from "../components/Setting/Level.vue";
import Rank from "../components/Setting/Rank.vue";
import Version from "../components/Setting/Version.vue";
export default {
  components: { Rank, Category, Version, Level },
  name: "Setting",

  data() {
    return {};
  },
  methods: {
    // 保存全部并滚回去抽歌
    backToRoll() {
      this.$router.push({ name: "Roll" });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "../source/scss/mixin";
.main-title {
  color: #ff7112;
  font-size: 24px;
  line-height: 1.5;
  margin: 0;
  text-align: center;
}
.setting-block {
  margin: 15px auto;
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
  background-color: #cff1eb;
  box-shadow: 0 0 0 3px #319df8, 0 0 0 6px #fff, 0 0 0 9px rgba(#fff, 0.4),
    0 0 5px 5px #1c6fb0;
  @include txsh(#319df8);
}
</style>
<style lang="scss">
.title {
  font-size: 18px;
  line-height: 1.5;
  margin: 0.5em 0;
}
.tips {
  color: #666;
  font-size: 14px;
}
</style>