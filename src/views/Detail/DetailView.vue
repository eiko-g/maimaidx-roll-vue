<template>
  <div class="detail" v-if="song != undefined || song != null">
    <h2 class="main-title">歌曲信息</h2>
    <img :src="coverSrc" class="cover" alt="歌曲封面" />
    <div class="song-info">
      <h3 class="song-title">
        <span :class="['type', song.类型]">{{ song.类型 }}</span
        >{{ song.曲名 }}
      </h3>
      <p class="author">{{ song.作者 }}</p>

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
            <td>{{ song.等级.B }}</td>
            <td>{{ song.等级.A }}</td>
            <td>{{ song.等级.E }}</td>
            <td>{{ song.等级.M }}</td>
            <td>{{ song.等级.R }}</td>
          </tr>
        </tbody>
      </table>

      <table class="table-info">
        <thead>
          <tr>
            <th>分类</th>
            <th>BPM</th>
            <th>版本</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ catText }}</td>
            <td>{{ song.BPM }}</td>
            <td>{{ song.版本 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="tips">更多资料等以后再说</p>
    <button class="back-button" @click="router.back()">返回</button>
  </div>
  <div class="not-found" v-else>
    <h1>没这首歌</h1>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { useSonglistStore } from '@/stores/songlist';
import { computed, onUpdated, ref } from 'vue';

const route = useRoute();
const router = useRouter();
const songlistStore = useSonglistStore();
const song = ref();
song.value = songlistStore.originSonglist.find(
  (song) => song.id === Number.parseInt(route.params.id as string),
);

// 如果直接改了路由中的歌曲 ID 的话，就更新一下歌曲信息
onUpdated(() => {
  song.value = songlistStore.originSonglist.find(
    (song) => song.id === Number.parseInt(route.params.id as string),
  );
});

const coverSrc = computed(() => {
  let coverStr: string;
  if (song.value.封面 != undefined || song.value.封面 != null) {
    coverStr = `./assets/img/cover.png/${song.value.封面}`;
  } else {
    coverStr = './assets/img/nocover.png';
  }
  return coverStr;
});

const catText = computed(() => {
  switch (song.value.分类) {
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
</script>

<style lang="scss" scoped>
@use '@/style/mixin';

.main-title {
  color: var(--color-border);
  font-size: 24px;
  line-height: 1.5;
  margin: 0;
  text-align: center;
}

.tips {
  color: #ccc;
  font-size: 14px;
  text-align: center;
}

.cover {
  display: block;
  margin: 15px auto;
  box-shadow: 0 3px 5px #ccc;
}

.song-info {
  font-size: 16px;

  .song-title {
    color: var(--color-border);
    font-size: 24px;
    margin: 0;
    line-height: 1.5;
    text-align: center;

    .type {
      font-size: 16px;
      display: inline-block;
      padding: 5px 10px;
      text-align: center;
      font-weight: bold;
      font-weight: 900;
      box-shadow: 0 0 3px #ccc;
      border-radius: 99em;

      background-color: #45aeff;
      color: #fff;

      &.DX {
        color: #ff4628;
        background: linear-gradient(150deg, #ff4628 0, #ff4628 50%, #faad07 50%, #faad07 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        // text-fill-color: transparent;
      }
    }
  }

  .author {
    text-align: center;
    font-size: 14px;
  }

  .table-lv,
  .table-info {
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
}

.back-button {
  display: block;
  background-color: transparent;
  border: 0;
  width: 100%;
  max-width: 200px;
  margin: 20px auto 30px;
  padding: 5px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  border-radius: 99em;
  cursor: pointer;
  text-align: center;

  @include mixin.bxsh(#6f34b0, #b98bf8, rgba(111, 52, 176, 0.7));
  @include mixin.txsh(#6f34b0);
}
</style>
