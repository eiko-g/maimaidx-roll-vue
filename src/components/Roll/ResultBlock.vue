<template>
  <div class="result">
    <p class="tip">※ 封面切换时载入稍慢</p>

    <div :class="['result-display', props.currentRank]">
      <div :class="['type', currentSong.类型]">
        <div class="dx">
          <span class="text">
            <span>で</span>
            <span>ら</span>
            <span>っ</span>
            <span>く</span>
            <span>す</span>
          </span>
        </div>
        <div class="standard"><span class="text">スタンダード</span></div>
      </div>
      <div class="result-cover">
        <img :src="coverSrc" class="cover" alt="歌曲封面" />
      </div>
      <div class="result-meta">
        <div class="song-rank">{{ rankText }}</div>
        <div class="song-lv">Lv <span class="song-lv-num">{{ lvText }}</span></div>
      </div>
      <div class="song-info">
        <h3 class="song-title" lang="ja-jp">{{ currentSong.曲名 }}</h3>
        <p class="song-author" lang="ja-jp">{{ currentSong.作者 }}</p>
      </div>

      <p class="other-info">
        <span class="cat">{{ catText }}</span>
        /
        <span class="version">{{ currentSong.版本 }}</span>
      </p>
    </div>
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
    case "pops_anime": {
      return "动画 & 流行";
    }
    case "niconico": {
      return "nico & V家";
    }
    case "toho": {
      return "东方 Project";
    }
    case "variety": {
      return "其他游戏";
    }
    case "maimai": {
      return "maimai";
    }
    case "gekichu": {
      return "音击 & 中二";
    }
    default: {
      return "分类";
    }
  }
});

let rankText = computed(() => {
  switch (props.currentRank) {
    case "B": {
      return "Basic";
    }
    case "A": {
      return "Advanced";
    }
    case "E": {
      return "Expert";
    }
    case "M": {
      return "Master";
    }
    case "R": {
      return "Re:Master";
    }
    default: {
      return "难度";
    }
  }
});
// 万事 Swtich
let lvText = computed(() => {
  switch (props.currentRank) {
    case "B": {
      return props.currentSong.等级.B;
    }
    case "A": {
      return props.currentSong.等级.A;
    }
    case "E": {
      return props.currentSong.等级.E;
    }
    case "M": {
      return props.currentSong.等级.M;
    }
    case "R": {
      return props.currentSong.等级.R;
    }
    default: {
      return "??";
    }
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

.result-display {
  margin: 50px auto;
  max-width: 300px;
  background-color: #eee;

  .type {
    font-size: 14px;
    text-align: center;
    font-weight: bold;
    font-weight: 900;

    &.DX {
      &>.dx {
        opacity: 1;
      }

      &>.standard {
        opacity: 0;
      }
    }

    &>div {
      display: inline-block;
      width: 50%;
      margin: 15px auto;
      transition: opacity .2s;

      &>.text {
        width: 100%;
        display: inline-block;
        padding: 5px;
        border-radius: 15px;
      }
    }

    &>.dx {
      opacity: 0;

      .text {
        background-color: #fff;

        &>span:nth-child(1) {
          color: #ff4646
        }

        &>span:nth-child(2) {
          color: #ffa02d;
        }

        &>span:nth-child(3) {
          color: #ffdc00;
        }

        &>span:nth-child(4) {
          color: #9ac948;
        }

        &>span:nth-child(5) {
          color: #00aae6;
        }
      }
    }

    &>.standard {
      .text {
        background-color: #45aeff;
        color: #fff;
      }
    }
  }

  .result-cover {
    .cover {
      display: block;
      width: 100%;
      height: auto;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .result-meta {
    display: flex;

    .song-rank {
      font-size: 18px;
      width: 60%;
      padding: 10px 15px;
      background-color: #ddd;
      text-transform: uppercase;
    }

    .song-lv {
      width: 40%;
      padding: 10px 15px;
      font-size: 12px;

      .song-lv-num {
        font-size: 20px;
      }
    }
  }

  .song-info {
    .song-title {
      font-size: 20px;
      line-height: 1.5;
      margin: 10px 0;
      padding: 0;
    }

    .song-author {
      font-size: 12px;
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }
  }

  .other-info {
    font-size: 14px;
    line-height: 1.5;
    margin: 10px 0;
  }
}
</style>
