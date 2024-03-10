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
      </span>
      ]
      <span class="lv">{{ lvText }}</span>
    </p>
    <p>
      <b>抽选分类：</b>
      <span class="category">{{ catText }}</span>
    </p>
    <p>
      <b>抽选版本：</b>
      <span class="version">{{ verText }}</span>
    </p>
    <p>
      <b>抽选歌单：</b>
      <span class="songlist">ver.CH1.33-I</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["setting"]);

let lvText = computed(() => {
  let str = "";
  if (props.setting.lvMin > 0) {
    str = props.setting.lvMin;
    if (props.setting.lvMinPlus === true) {
      str += "+";
    }
    if (props.setting.lvMultiple) {
      str += ` ~ ${props.setting.lvMax}`;
      if (props.setting.lvMaxPlus === true) {
        str += "+";
      }
    }
  } else {
    str = "未设置等级";
  }
  return str;
});

function getCatName(cat: string) {
  switch (cat) {
    case "pops_anime":
      return "动画 & 流行";
    case "niconico":
      return "nico & V家";
    case "toho":
      return "东方 Project";
    case "variety":
      return "其他游戏";
    case "maimai":
      return "maimai";
    case "gekichu":
      return "音击 & 中二";
    case "all":
      return "全部分类";
    default:
      return "分类有误";
  }
}

let catText = computed(() => {
  let tempArr: Array<string> = [];
  props.setting.category.forEach((item: string) => {
    tempArr.push(getCatName(item));
  });
  return tempArr.join("、");
});

let verText = computed(() => {
  let str = "";
  if (props.setting.version[0] !== "all") {
    str = props.setting.version.join("、");
  } else {
    str = "全部版本";
  }
  return str;
});
</script>

<style scoped lang="scss">
.setting-info {
  color: #333;
  font-size: 12px;
  text-align: center;

  .rank {
    >span:not(:last-child)::after {
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
