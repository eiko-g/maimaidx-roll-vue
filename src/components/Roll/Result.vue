<template>
  <div class="result">
    <p class="tip">※ 封面切换时载入稍慢</p>
    <div class="cover-area">
      <img :src="getCover" alt="Cover" class="cover" />
      <div :class="['song-type', getType]">
        <span class="text">{{ getType }}</span>
      </div>
    </div>

    <h3 class="title" lang="ja-jp">{{ getTitle }}</h3>
    <p class="info">
      <span class="cat">{{ getCat }}</span>
      /
      <span class="version">{{ getVer }}</span>
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
          <td
            id="table-lv-num-B"
            :class="['table-lv-num', { current: currentRank('B') }]"
          >{{ getLv.B }}</td>
          <td
            id="table-lv-num-A"
            :class="['table-lv-num', { current: currentRank('A') }]"
          >{{ getLv.A }}</td>
          <td
            id="table-lv-num-E"
            :class="['table-lv-num', { current: currentRank('E') }]"
          >{{ getLv.E }}</td>
          <td
            id="table-lv-num-M"
            :class="['table-lv-num', { current: currentRank('M') }]"
          >{{ getLv.M }}</td>
          <td
            id="table-lv-num-R"
            :class="['table-lv-num', { current: currentRank('R') }]"
          >{{ getLv.R }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Result",
  props: ["currentSong"],
  data() {
    return {
      src: "./assets/img/nocover.png",
      type: "谱面类型",
      title: "油婶么呢？",
      category: "分类",
      levels: {
        B: "m",
        A: "a",
        E: "i",
        M: "D",
        R: "X",
      },
    };
  },
  methods: {
    currentRank(input) {
      return input == this.$store.getters.getCurrentDiffculty;
    },
  },
  computed: {
    getCover() {
      if (this.currentSong.封面) {
        return `./assets/img/cover.png/${this.currentSong.封面}`;
      } else {
        return "./assets/img/nocover.png";
      }
    },
    getTitle() {
      return this.currentSong.曲名;
    },
    getCat() {
      if (this.currentSong.分类) {
        let text = {
          pops_anime: "动画 & 流行",
          niconico: "nico & V家",
          toho: "东方 Project",
          variety: "其他游戏", // 这个其实写联动比较好？
          maimai: "maimai",
          gekichu: "音击 & 中二",
        };

        return text[this.currentSong.分类];
      } else {
        return "分类";
      }
    },
    getVer() {
      return this.currentSong.版本;
    },
    getType() {
      return this.currentSong.类型;
    },
    getLv() {
      return this.currentSong.等级;
    },
  },
};
</script>

<style lang="scss" scoped>
.ua {
  color: var(--color-B-dark);
}
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
    box-shadow: 0 0 0 5px var(--color-B);
  }
  &.A {
    box-shadow: 0 0 0 5px var(--color-A);
  }
  &.E {
    box-shadow: 0 0 0 5px var(--color-E);
  }
  &.M {
    box-shadow: 0 0 0 5px var(--color-M);
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
      background: linear-gradient(150deg, #ff4628 50%, #faad07 50% 100%);
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