<template>
  <div class="result">
    <p class="tip">※ 封面切换时载入稍慢</p>

    <div :class="['result-display', props.currentRank, map_type]">
      <div :class="['type', map_type]">
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
        <div class="song-lv">Lv <span class="song-lv-num">{{ lvText }}</span></div>
      </div>
    </div>
    <div class="song-info">
      <h3 class="song-title" lang="ja-jp">{{ currentSong.name }}</h3>
      <p class="song-author" lang="ja-jp">{{ currentSong.artist_name }}</p>
    </div>

    <p class="other-info">
      <span class="cat">{{ catText }}</span>
      /
      <span class="version">{{ verText }}</span>
    </p>

  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
// import { useRouter } from "vue-router";
import type IMusic from "@/interface/IMusic";
import { useSonglistStore } from "@/stores/songlist";
import type IVersion from "@/interface/IVersion";

type RankKey = 'basic' | 'advanced' | 'expert' | 'master' | 're_master' | 'utage';
const props = defineProps<{ currentSong: IMusic; currentRank: RankKey | string }>();
// const router = useRouter();

const songlistStore = useSonglistStore();

// 封面链接
const coverSrc = computed(() => {
  if(props.currentSong.id > 0){
    return `./assets/img/jacket/UI_Jacket_${(props.currentSong.id % 10000).toString().padStart(6,'0')}.png`;
  }else {
    return `./assets/img/jacket/UI_Jacket_000000.png`;
  }
});

// 谱面类型
const map_type = computed(()=>{
  if (props.currentSong.genre === 107) {
    return 'type-utage';
  }else if (props.currentSong.id > 10000) {
    return 'type-dx';
  }else {
    return 'type-std';
  }
})

// 查看曲目详情
function viewDetail(id: number) {
  // TODO: 以后再写这部分
  console.log('song id',id);
  if (id >= 1) {
    // router.push({ name: 'detail', params: { id: id } });
  }
}

const catText = computed(() => {
  switch (props.currentSong.genre) {
    case 101: {
      return "动画 & 流行";
    }
    case 102: {
      return "nico & V家";
    }
    case 103: {
      return "东方 Project";
    }
    case 104: {
      return "其他游戏";
    }
    case 105: {
      return "maimai";
    }
    case 106: {
      return "音击 & 中二";
    }
    case 107: {
      return "宴会场";
    }
    default: {
      return "分类";
    }
  }
});

const rankText = computed(() => {
  switch (props.currentRank) {
    case "basic": {
      return "Basic";
    }
    case "advanced": {
      return "Advanced";
    }
    case "expert": {
      return "Expert";
    }
    case "master": {
      return "Master";
    }
    case "re_master": {
      return "Re:Master";
    }
    case "utage": {
      return "宴会场"
    }
    default: {
      return "难度";
    }
  }
});

const lvText = computed(() => {
  const level = props.currentSong.levels[props.currentRank as keyof typeof props.currentSong.levels];
  if ((level * 10) % 10 >= 6) {
    return Math.floor(level) + '+';
  } else {
    return Math.floor(level);
  }
});

const verText = computed(()=>{
  return (songlistStore.version as IVersion[]).find(item=> item.id == props.currentSong.add_version)?.name || '未知版本';
})
</script>

<style lang="scss" scoped>
@use "@/style/preset";
@use "@/style/mixin";

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
    transition: background-color .2s, border-radius .2s;
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

    &.type-dx {
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
      margin: auto;
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

    &>.standard {
      .text {
        background-color: #45aeff;
        color: #fff;
      }
    }
  }

  &.type-dx {
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
      // @include mixin.txsh(var(--color-M-dark));
    }

    .song-lv {
      width: 40%;
      padding: 10px 15px;
      font-size: 12px;
      background-color: rgba(#fff, .5);
      // @include mixin.txsh(var(--color-M-dark));
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
  basic:preset.$color-B-dark,
  advanced:preset.$color-A-dark,
  expert:preset.$color-E-dark,
  master:preset.$color-M-dark
);

@each $rank,
$color in $ranks {
  .result-display.#{$rank} {
    .type {

      .dx,
      .standard {
        background-color: rgba($color, .8);
      }
    }

    .result-cover {
      background-color: rgba($color, .8);
    }

    .result-meta {
      background-color: rgba($color, .8);

      .song-rank,
      .song-lv {
        @include mixin.txsh($color);
      }
    }
  }
}

.result-display.re_master {
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
      @include mixin.txsh(preset.$color-R-dark);
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
