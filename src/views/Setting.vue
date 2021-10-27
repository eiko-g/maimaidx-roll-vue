<template>
  <div class="setting">
    <h2 class="main-title">抽歌设置</h2>
    <Rank />
    <Category />
    <Level />
    <Version />
    <p class="tips">* 暂时未做输入检查，请不要乱填写哈。</p>
    <button class="save" @click="backToRoll">保存设置</button>
  </div>
</template>

<script>
import Category from "../components/Setting/Category.vue";
import Level from "../components/Setting/Level.vue";
import Rank from "../components/Setting/Rank.vue";
import Version from "../components/Setting/Version.vue";
import mess from "../mixins/mess";

export default {
  components: { Rank, Category, Version, Level },
  name: "Setting",

  data() {
    return {
      done: false,
    };
  },
  methods: {
    // 筛选歌单，都要返回了在这里筛也没事的啦
    createSongList() {
      let setting = this.$store.getters.getSetting;
      console.log("设置", setting);
      let 原始歌单 = this.$store.getters.getOriginalSongList.曲目列表;
      console.log("原始歌单", 原始歌单);
      let 新歌单 = [];
      let fullRank = [];
      if (setting.rank.includes("all")) {
        fullRank = ["B", "A", "E", "M", "R"];
      } else {
        fullRank = setting.rank;
      }
      原始歌单.map((当前歌曲) => {
        // 前面已经已经预设了当 设置.难度 == 'all' 时则把全部难度塞了进去
        // 所以这边就懒得搞那么多了
        // 先设置结果
        let 结果 = false;
        // 判定这首歌对应难度的等级符不符合要求
        fullRank.forEach((难度) => {
          // 只要有一个难度的等级符合了要求就给过
          if (mess(当前歌曲.等级[难度], setting)) {
            结果 = true;
          }
        });
        if (结果) {
          新歌单.push(当前歌曲);
        }
      });

      // 筛一遍分类
      if (setting.category != "all") {
        新歌单 = 新歌单.filter((被选中的歌) => {
          return setting.category.includes(被选中的歌.分类);
        });
      }

      // 筛一遍版本
      if (setting.version != "all") {
        新歌单 = 新歌单.filter((被选中的歌) => {
          return setting.version.includes(被选中的歌.版本);
        });
      }

      console.log("新歌单", 新歌单);
      if (新歌单.length > 0) {
        this.$store.commit("saveSongList", 新歌单);
        this.done = true;
      }
    },
    // 保存全部并滚回去抽歌
    backToRoll() {
      this.createSongList();
      if (this.done == true) {
        this.$store.commit("setFirstRun");
        this.$router.push({ name: "Roll" });
      } else {
        alert("歌单未成功生成，请检查设置是否有误");
      }
    },
  },
  created() {
    let songList = this.$store.getters.getOriginalSongList;
    if (!songList.data) {
      console.log("没载入到歌单，回去载入");
      this.$router.push({ name: "Loading" });
    }
  },
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
  @include bxsh();
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