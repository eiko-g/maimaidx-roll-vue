<template>
  <div class="result">
    <p class="tip">※ 封面切换时载入稍慢</p>
    <div class="cover-area">
      <img :src="coverSrc" alt="Cover" :class="['cover', props.currentRank]" />
      <div :class="['song-type', currentSong.类型]">
        <span class="text">{{ currentSong.类型 }}</span>
      </div>
    </div>

    <h3 class="title" lang="ja-jp">{{ currentSong.曲名 }}</h3>
    <p class="info">
      <span class="cat">{{ catText }}</span>
      /
      <span class="version">{{ currentSong.版本 }}</span>
    </p>

    <table class="table-lv">
      <thead>
        <tr>
          <th class="table-lv-name B">B</th>
          <th class="table-lv-name A">A</th>
          <th class="table-lv-name E">E</th>
          <th class="table-lv-name M">M</th>
          <th class="table-lv-name R">R</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td id="table-lv-num-B" :class="['table-lv-num', { current: currentRank('B') }]">
            {{ currentSong.等级.B }}
          </td>
          <td id="table-lv-num-A" :class="['table-lv-num', { current: currentRank('A') }]">
            {{ currentSong.等级.A }}
          </td>
          <td id="table-lv-num-E" :class="['table-lv-num', { current: currentRank('E') }]">
            {{ currentSong.等级.E }}
          </td>
          <td id="table-lv-num-M" :class="['table-lv-num', { current: currentRank('M') }]">
            {{ currentSong.等级.M }}
          </td>
          <td id="table-lv-num-R" :class="['table-lv-num', { current: currentRank('R') }]">
            {{ currentSong.等级.R }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type ISong from "@/interface/ISong";

const props = defineProps<{ currentSong: ISong; currentRank: string }>();

let coverSrc = computed(() => {
  let coverStr: string;
  if (props.currentSong.封面 != undefined || props.currentSong.封面 != null) {
    coverStr = `./assets/img/cover.png/${props.currentSong.封面}`;
  } else {
    coverStr = "./assets/img/nocover.png";
  }
  return coverStr;
});

function currentRank(input: string) {
  return input === props.currentRank;
}

let catText = computed(() => {
  switch (props.currentSong.分类) {
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
    default:
      return "分类";
  }
});
</script>

<style lang="scss" scoped>
.result {
  text-align: center;
}

.tip {
  font-size: 12px;
  color: #ccc;
  text-align: center;
  margin: 0;
  line-height: 1.5;
}

.cover-area {
  position: relative;
}

.cover {
  display: block;
  width: 200px;
  height: 200px;
  margin: 10px auto 20px;

  &.B {
    box-shadow: 0 0 0 5px var(--color-B-dark);
  }

  &.A {
    box-shadow: 0 0 0 5px var(--color-A-dark);
  }

  &.E {
    box-shadow: 0 0 0 5px var(--color-E-dark);
  }

  &.M {
    box-shadow: 0 0 0 5px var(--color-M-dark);
  }

  &.R {
    box-shadow: 0 0 0 5px var(--color-R);
  }
}

.song-type {
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-left: 50%;
  transform: translateX(-50%) translateY(50%);
  background-color: #45aeff;
  border-radius: 999em;
  box-shadow: 0 0 3px 1px #ccc;

  .text {
    display: inline-block;
    padding: 5px 8px;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
  }

  &.DX {
    background-color: #fff;
    box-shadow: 0 0 3px 1px #ccc;

    .text {
      color: #ff4628;
      background: linear-gradient(150deg, #ff4628 50%, #faad07 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      // text-fill-color: transparent;
    }
  }
}

.title {
  color: #2e94f4;
  font-size: 20px;
  line-height: 1.5;
  margin: 0;
}

.info {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  margin: 0;
}

.table-lv {
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 15px 0;

  th,
  td {
    font-size: 16px;
    text-align: center;
    width: 20%;
    border: 1px solid #ccc;
    padding: 5px;
  }

  .table-lv-name {
    &.B {
      background-color: var(--color-B);
    }

    &.A {
      background-color: var(--color-A);
    }

    &.E {
      background-color: var(--color-E);
    }

    &.M {
      background-color: var(--color-M);
    }

    &.R {
      background-color: var(--color-R);
    }
  }

  #table-lv-num {
    &-B.current {
      background-color: var(--color-B);
    }

    &-A.current {
      background-color: var(--color-A);
    }

    &-E.current {
      background-color: var(--color-E);
    }

    &-M.current {
      background-color: var(--color-M);
    }

    &-R.current {
      background-color: var(--color-R);
    }
  }
}
</style>
