<template>
  <div class="setting-info">
    <p>
      <b>抽选等级：</b>
      [ <span class="rank" v-html="getRank"></span> ]
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
      <span class="songlist">ver.CH1.11-E</span>
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
      let text = {
        all: "<span class='all'>全难度</span>",
        B: "<span class='B'>B</span>",
        A: "<span class='A'>A</span>",
        E: "<span class='E'>E</span>",
        M: "<span class='M'>M</span>",
        R: "<span class='R'>R</span>",
      };
      if (this.setting.rank) {
        let temp = [];
        this.setting.rank.forEach((item) => {
          temp.push(text[item]);
        });
        let str = temp.join(".");
        return str;
      } else {
        return "难度";
      }
    },
    getLv() {
      if (this.setting.lv) {
        let str = "";
        str += `${this.setting.lv.lvMin}`;
        if (this.setting.lv.lvMinPlus) {
          str += "+";
        }
        if (this.setting.lvMultiple) {
          str += ` ~ ${this.setting.lv.lvMax}`;
          if (this.setting.lv.lvMaxPlus) {
            str += "+";
          }
        }
        return str;
      } else {
        return "等级";
      }
    },
    getCat() {
      let text = {
        all: "全分类",
        pops_anime: "动画 & 流行",
        niconico: "nico & V家",
        toho: "东方 Project",
        variety: "其他游戏", // 这个其实写联动比较好？
        maimai: "maimai",
        gekichu: "音击 & 中二",
      };
      if (this.setting.category) {
        let temp = [];
        this.setting.category.forEach((item) => {
          temp.push(text[item]);
        });
        let str = temp.join("、");
        return str;
      } else {
        return "全分类";
      }
    },
    getVer() {
      if (this.setting.version) {
        let str = this.setting.version.join("、");
        return str;
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

<style lang="scss">
/**
 * 因为用 v-html 输出的部分不能被绑定
 * 所以就要用全局样式来写
 * 缺点：写不好容易污染全局样式
 */
.setting-info {
  .rank {
    .B {
      color: var(--color-B-dark);
    }
    .A {
      color: var(--color-A-dark);
    }
    .E {
      color: var(--color-E-dark);
    }
    .M {
      color: var(--color-M-dark);
    }
    .R {
      color: var(--color-R-dark);
    }
  }
}
</style>