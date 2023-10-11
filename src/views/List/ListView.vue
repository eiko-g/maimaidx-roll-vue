<template>
  <div class="list-view">
    <h2 class="main-title">曲目列表</h2>
    <p class="version">当前歌单版本：{{ songlistStore.version }}</p>
    <div class="category-list">
      <label class="cat-label all" for="cat-all"><input type="radio" id="cat-all" name="category" value="all"
          class="category" checked @click="changeCurrentCategory('all')">
        <div class="inner">全部</div>
      </label>
      <label class="cat-label pops_anime" for="cat-pops_anime"><input type="radio" id="cat-pops_anime" name="category"
          value="pops_anime" class="category" @click="changeCurrentCategory('pops_anime')">
        <div class="inner">动画 & 流行</div>
      </label>
      <label class="cat-label niconico" for="cat-niconico"><input type="radio" id="cat-niconico" name="category"
          value="niconico" class="category" @click="changeCurrentCategory('niconico')">
        <div class="inner">nico & V家</div>
      </label>
      <label class="cat-label toho" for="cat-toho"><input type="radio" id="cat-toho" name="category" value="toho"
          class="category" @click="changeCurrentCategory('toho')">
        <div class="inner">东方
          Project</div>
      </label>
      <label class="cat-label variety" for="cat-variety"><input type="radio" id="cat-variety" name="category"
          value="variety" class="category" @click="changeCurrentCategory('variety')">
        <div class="inner">其他游戏</div>
      </label>
      <label class="cat-label maimai" for="cat-maimai"><input type="radio" id="cat-maimai" name="category" value="maimai"
          class="category" @click="changeCurrentCategory('maimai')">
        <div class="inner">maimai</div>
      </label>
      <label class="cat-label gekichu" for="cat-gekichu"><input type="radio" id="cat-gekichu" name="category"
          value="gekichu" class="category" @click="changeCurrentCategory('gekichu')">
        <div class="inner">音击
          & 中二</div>
      </label>
    </div>
    <div class="songlist">
      <div class="song-block" v-if="currentCategory != 'all'" v-for="song in currentList" :key="song.id">
        <!-- {{ song }} -->

        <img :src="coverSrc(song.封面)" alt="封面" class="cover" loading="lazy">
        <div class="song-info">
          <p class="category">{{ catText(song.分类) }} &bull; {{ song.类型 }}</p>
          <h3 class="title">
            <router-link :to="{ name: 'detail', params: { id: song.id } }">{{ song.曲名 }}</router-link>
          </h3>
          <p class="author">{{ song.作者 }}</p>
        </div>
      </div>
      <p class="alert" v-else>因为显示所有歌太卡了，所以默认不显示全部。</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type ISong from "@/interface/ISong";
import { useSonglistStore } from "@/stores/songlist";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const songlistStore = useSonglistStore();

const router = useRouter();

const list = songlistStore.originSonglist;

let currentList: Array<ISong> = reactive([]);

let currentCategory = ref('all');

function changeCurrentCategory(category: string) {
  currentCategory.value = category;
  console.log('当前分类改为：', category);
  changeCurrentList(category);
}
function changeCurrentList(category: string) {
  console.log('当前歌单筛选为该分类：', category);
  currentList.length = 0;
  let temp = list.filter(item => item.分类 == category);
  temp.forEach(item => currentList.push(item));
}


let coverSrc = (cover: string | undefined) => {
  let coverStr: string;
  if (cover != undefined || cover != null) {
    coverStr = `./assets/img/cover.png/${cover}`;
  } else {
    coverStr = "./assets/img/nocover.png";
  }
  return coverStr;
};

let catText = (category: string) => {
  switch (category) {
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
};
</script>

<style scoped lang="scss">
@import "@/style/mixin";

.main-title {
  color: var(--color-border);
  font-size: 24px;
  line-height: 1.5;
  margin: 0;
  text-align: center;
}

.song-block {
  display: flex;
  margin-bottom: 20px;
  content-visibility: auto;
  contain-intrinsic-size: auto 300px;

  .cover {
    width: 100px;
    height: 100px;
  }

  .song-info {
    padding: 0 15px;

    p,
    h3 {
      margin: 0;
      line-height: 1.5;
    }

    .title {
      font-size: 18px;
    }

    .author {
      font-size: 12px;
    }
  }
}


.category-list {
  display: flex;
  flex-wrap: wrap;

  .cat-label {
    user-select: none;

    &:not(:last-child) {
      margin-right: 10px;
    }

    margin-bottom: 10px;

    &:hover {
      cursor: pointer;
    }

    input[type="radio"] {
      display: none;
    }

    .inner {
      display: block;
      border: 3px solid #ccc;
      padding: 5px;
    }

    &.all {
      @include input-label();
    }

    &.pops_anime {
      @include input-label(#ccc, #ff972a, #ff972a);
    }

    &.niconico {
      @include input-label(#ccc, #09c8d4, #09c8d4);
    }

    &.toho {
      @include input-label(#ccc, #ad59ee, #ad59ee);
    }

    &.variety {
      @include input-label(#ccc, #42de6a, #42de6a);
    }

    &.maimai {
      @include input-label(#ccc, #f74949, #f74949);
    }

    &.gekichu {
      @include input-label(#ccc, #3585fe, #3585fe);
    }
  }
}
</style>