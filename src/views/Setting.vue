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
    // 处理过程
    mess(inputLevel) {
      let setting = this.$store.getters.getSetting;
      // console.log("InputLevel", inputLevel);
      // 直接抄以前的部分了，还是用中文写变量方便
      // 高低一致指的是在多选难度时，最低和最高的设置完全一致
      // 这时候就跟单难度的判断方法一样了
      let 高低一致 =
        setting.lvMultiple == true &&
        setting.lv.lvMin == setting.lv.lvMax &&
        setting.lv.lvMinPlus == setting.lv.lvMaxPlus;
      // console.log("高低一致", 高低一致);
      if (setting.lvMultiple == false || 高低一致 == true) {
        // 单等级时的判断方法
        let 抽歌等级 = setting.lv.lvMin;
        // 如果要带加号就加上
        if (setting.lv.lvMinPlus) {
          抽歌等级 = 抽歌等级 + "+";
        }
        // console.log("抽歌等级", 抽歌等级);
        // 直接判断一不一样就是了
        return inputLevel == 抽歌等级;
      } else if (setting.lvMultiple == true || 高低一致 == false) {
        // 多等级时的判断方法
        // 先判定上下限
        // 如果高低整数等级一样的话，比如 12 跟 12+
        if (setting.lv.lvMin == setting.lv.lvMax) {
          // 这个好处理，直接返回结果就好
          // 举例：取整('12+') == 12，返回 true
          // 取整('13+') == 12，返回 false
          return Number.parseInt(inputLevel) == setting.lv.lvMin;
        } else {
          // 多等级的话，比如 11+ ~ 13
          // 先预设判定结果
          let 判定结果 = false;
          // 先判断整数范围
          // 如果某首歌是 12+ 的话就在 11+ ~ 13 里面，这个肯定没问题，嗯🚩
          // 同理，11/11+ 和 13/13+ 目前也是在范围内，下面再判断边缘情况
          // 抽 11+ ~ 12 也是没问题的，11/12+ 的情况在下面会判断
          if (
            Number.parseInt(inputLevel) >= setting.lv.lvMin &&
            Number.parseInt(inputLevel) <= setting.lv.lvMax
          ) {
            判定结果 = true;
          }
          // 再判断边缘情况
          // 如果抽到 11 的话，就不在 11+ ~ 13 的范围了嘛
          // 如果是抽 11 ~ 13 就不用这个判断了
          if (
            // what if 11/11+
            Number.parseInt(inputLevel) == setting.lv.lvMin &&
            // what if 要求结尾是+
            setting.lv.lvMinPlus == true &&
            // what if 结尾没有+
            inputLevel[inputLevel.length - 1] != "+"
          ) {
            // 就不在抽歌范围了
            判定结果 = false;
            // 举例：抽 11+ ~ 12，上面筛出来一首 11
            // 那么 11 取整得到 11，设置要求带加号，但是 11 的最后一位不是 +，所以为 false
            // 筛出来一首 11+ 的话，取整得到 11，最后一位是 +，所以无动作，继承上面的 判定结果 = true
          }

          // 判断最高等级的就是反过来的，我也不知道为什么这么写，但是感觉就该这样，脑子不太行。
          if (
            // what if 13/13+
            Number.parseInt(inputLevel) == setting.lv.lvMax &&
            // what if 要求结尾不是+
            setting.lv.lvMaxPlus != true &&
            // what if 结尾有+
            inputLevel[inputLevel.length - 1] == "+"
          ) {
            // 就不在抽歌范围了
            判定结果 = false;
            // 举例：抽 11+ ~ 12，上面筛出来一首 12+
            // 那么 12+ 取整得到 12，设置要求不带加号，但是 12+ 的最后一位是 +，所以为 false
            // 筛出来一首 12 的话，取整得到 12，最后一位不是 +，所以无动作，继承上面的 判定结果 = true
          }

          // 返回判定结果
          return 判定结果;
        }
      }
    },
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