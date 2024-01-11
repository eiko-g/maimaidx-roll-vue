<template>
  <div class="result">
    <p class="tip">※ 封面切换时载入稍慢</p>

    <div :class="['result-display', props.currentRank, currentSong.类型]">
      <div :class="['type', currentSong.类型]">
        <div class="dx">
          <span class="text">
            <span class="inner">DX</span>
          </span>
        </div>
        <div class="standard"><span class="text">标准</span></div>
      </div>
      <div class="result-cover" @click="viewDetail(currentSong.id)">
        <img :src="coverSrc" class="cover" alt="歌曲封面" />
      </div>

      <div class="result-meta">
        <div class="song-rank">{{ rankText }}</div>
        <div class="song-lv">
          Lv <span class="song-lv-num">{{ lvText }}</span>
        </div>
      </div>
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
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type ISong from '@/interface/ISong';
import { useRouter } from 'vue-router';

const props = defineProps<{ currentSong: ISong; currentRank: string }>();
const router = useRouter();

let coverSrc = computed(() => {
  let coverStr: string;
  if (props.currentSong.封面 != undefined || props.currentSong.封面 != null) {
    coverStr = `./assets/img/cover.png/${props.currentSong.封面}`;
  } else {
    coverStr = './assets/img/nocover.png';
  }
  return coverStr;
});

function viewDetail(id: number) {
  console.log(id);
  if (id >= 1) {
    router.push({ name: 'detail', params: { id: id } });
  }
}

let catText = computed(() => {
  switch (props.currentSong.分类) {
    case 'pops_anime': {
      return '动画 & 流行';
    }
    case 'niconico': {
      return 'nico & V家';
    }
    case 'toho': {
      return '东方 Project';
    }
    case 'variety': {
      return '其他游戏';
    }
    case 'maimai': {
      return 'maimai';
    }
    case 'gekichu': {
      return '音击 & 中二';
    }
    default: {
      return '分类';
    }
  }
});

let rankText = computed(() => {
  switch (props.currentRank) {
    case 'B': {
      return 'Basic';
    }
    case 'A': {
      return 'Advanced';
    }
    case 'E': {
      return 'Expert';
    }
    case 'M': {
      return 'Master';
    }
    case 'R': {
      return 'Re:Master';
    }
    default: {
      return '难度';
    }
  }
});
// 万事 Swtich
let lvText = computed(() => {
  switch (props.currentRank) {
    case 'B': {
      return props.currentSong.等级.B;
    }
    case 'A': {
      return props.currentSong.等级.A;
    }
    case 'E': {
      return props.currentSong.等级.E;
    }
    case 'M': {
      return props.currentSong.等级.M;
    }
    case 'R': {
      return props.currentSong.等级.R;
    }
    default: {
      return '??';
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/style/preset';
@import '@/style/mixin';

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
  margin: 10px auto;
  max-width: 250px;
  filter: drop-shadow(0 0 3px #999);

  & * {
    transition:
      background-color 0.2s,
      border-radius 0.2s;
  }

  .type {
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    font-weight: 900;

    .dx,
    .standard {
      // background-color: rgba($color-M-dark, .8);
      border-radius: 10px 10px 0 0;
      padding: 5px 5px 0;
    }

    &.DX {
      & > .dx {
        opacity: 1;
      }

      & > .standard {
        opacity: 0;
      }
    }

    & > div {
      display: inline-block;
      width: 50%;
      margin: auto;
      transition: opacity 0.2s;

      & > .text {
        width: 100%;
        display: inline-block;
        padding: 5px;
        border-radius: 15px;
      }
    }

    & > .dx {
      opacity: 0;

      .text {
        background-color: #fff;

        .inner {
          color: #ff4628;
          background: linear-gradient(150deg, #ff4628 0, #ff4628 50%, #faad07 50%, #faad07 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          // text-fill-color: transparent;
        }
      }
    }

    & > .standard {
      .text {
        background-color: #45aeff;
        color: #fff;
      }
    }
  }

  &.DX {
    .result-cover {
      border-radius: 0 10px 0 0;
    }
  }

  .result-cover {
    padding: 15px 15px 0;
    // background-color: rgba($color-M-dark, .8);
    border-radius: 10px 0 0 0;

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
    color: #fff;
    // background-color: rgba($color-M-dark, .8);
    border-radius: 0 0 10px 10px;

    .song-rank {
      font-size: 18px;
      width: 60%;
      padding: 10px 15px;
      text-transform: uppercase;
      font-weight: bold;
      font-weight: 900;
      // @include txsh(var(--color-M-dark));
    }

    .song-lv {
      width: 40%;
      padding: 10px 15px;
      font-size: 12px;
      background-color: rgba(#fff, 0.5);
      // @include txsh(var(--color-M-dark));
      border-radius: 0 0 10px 0;

      .song-lv-num {
        font-size: 20px;
        font-weight: bold;
        font-weight: 900;
      }
    }
  }
}

$ranks: (
  B: $color-B-dark,
  A: $color-A-dark,
  E: $color-E-dark,
  M: $color-M-dark
);

@each $rank, $color in $ranks {
  .result-display.#{$rank} {
    .type {
      .dx,
      .standard {
        background-color: rgba($color, 0.8);
      }
    }

    .result-cover {
      background-color: rgba($color, 0.8);
    }

    .result-meta {
      background-color: rgba($color, 0.8);

      .song-rank,
      .song-lv {
        @include txsh($color);
      }
    }
  }
}

.result-display.R {
  .type {
    .dx,
    .standard {
      background-color: var(--color-R);
    }
  }

  .result-cover {
    background-color: var(--color-R);
  }

  .result-meta {
    background-color: var(--color-R);

    .song-rank,
    .song-lv {
      @include txsh($color-R-dark);
    }
  }
}

.song-info {
  .song-title {
    color: #0b3871;
    font-size: 20px;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  .song-author {
    color: #333;
    font-size: 12px;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }
}

.other-info {
  color: #333;
  font-size: 14px;
  line-height: 1.5;
  margin: 10px 0;
}
</style>
