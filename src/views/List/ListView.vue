<template>
  <div class="list-view">
    <h2 class="main-title">曲目列表</h2>
    <div class="category-list">
      <label for="cat-pops_anime"><input type="radio" id="cat-pops_anime" name="category" value="pops_anime"
          class="category" checked><span>动画 & 流行</span></label>
      <label for="cat-niconico"><input type="radio" id="cat-niconico" name="category" value="niconico"
          class="category"><span>nico & V家</span></label>
      <label for="cat-toho"><input type="radio" id="cat-toho" name="category" value="toho" class="category"><span>东方
          Project</span></label>
      <label for="cat-variety"><input type="radio" id="cat-variety" name="category" value="variety"
          class="category"><span>其他游戏</span></label>
      <label for="cat-maimai"><input type="radio" id="cat-maimai" name="category" value="maimai"
          class="category"><span>maimai</span></label>
      <label for="cat-gekichu"><input type="radio" id="cat-gekichu" name="category" value="gekichu"
          class="category"><span>音击
          & 中二</span></label>
    </div>
    <div class="songlist">
      <div class="song-block" v-for="song in list" :key="song.id">
        <!-- {{ song }} -->

        <img :src="coverSrc(song.封面)" alt="封面" class="cover">
        <div class="song-info">
          <p class="category">{{ catText(song.分类) }}</p>
          <h3 class="title">
            <router-link :to="{ name: 'detail', params: { id: song.id } }">{{ song.曲名 }}</router-link>
          </h3>
          <p class="author">{{ song.作者 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSonglistStore } from "@/stores/songlist";

const songlistStore = useSonglistStore();

const list = songlistStore.originSonglist;

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

    .author {
      font-size: 12px;
    }
  }
}
</style>