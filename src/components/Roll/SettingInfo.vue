<template>
  <div class="setting-info">
    <p>
      <b>抽选等级：</b>
      [
      <span class="rank">
        <span v-if="!setting.rank">难度</span>
        <span v-if="setting.rank && setting.rank.includes('all')" class="all">全难度</span>
        <span v-if="setting.rank && setting.rank.includes('B')" class="B">B</span>
        <span v-if="setting.rank && setting.rank.includes('A')" class="A">A</span>
        <span v-if="setting.rank && setting.rank.includes('E')" class="E">E</span>
        <span v-if="setting.rank && setting.rank.includes('M')" class="M">M</span>
        <span v-if="setting.rank && setting.rank.includes('R')" class="R">R</span>
      </span> ]
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
  /*
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
  */
};
</script>

<script setup>
import { computed, defineProps, reactive } from 'vue';

const props = defineProps(['setting']);
console.log('Props', props)

const setting = reactive(props.setting);
console.log('SettingInfo 的 setting', setting);

let getLv = computed(() => {
  if (setting.lv.lvMin > 0) {
    let str = "";
    str += `${setting.lv.lvMin}`;
    if (setting.lv.lvMinPlus) {
      str += "+";
    }
    if (setting.lvMultiple) {
      str += ` ~ ${setting.lv.lvMax}`;
      if (setting.lv.lvMaxPlus) {
        str += "+";
      }
    }
    return str;
  } else {
    return "未设置等级";
  }
});

let getCat = computed(() => {
  let text = {
    all: "全分类",
    pops_anime: "动画 & 流行",
    niconico: "nico & V家",
    toho: "东方 Project",
    variety: "其他游戏", // 这个其实写联动比较好？
    maimai: "maimai",
    gekichu: "音击 & 中二",
  };
  if (setting.category[0] !== 'all') {
    let temp = [];
    setting.category.forEach((item) => {
      temp.push(text[item]);
    });
    let str = temp.join("、");
    return str;
  } else {
    return "全分类";
  }
});

let getVer = computed(() => {
  if (setting.version && setting.version[0] !== 'all') {
    let str = setting.version.join("、");
    return str;
  } else {
    return "全版本";
  }
});
</script>

<style lang="scss" scoped>
.setting-info {
  color: #333;
  font-size: 12px;
  text-align: center;
}
</style>

<style lang="scss" scoped>
.setting-info {
  .rank {
    > span:not(:last-child)::after {
      content: ".";
    }
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