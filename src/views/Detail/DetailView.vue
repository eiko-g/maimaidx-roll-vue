<template>
  <div class="detail" v-if="song != undefined || song != null">
    <h1>Detail Song</h1>
    <p>{{ $route.params.id }}</p>
    <pre>{{ song }}</pre>
    <a href="#" onclick="history.back()">Back</a>
  </div>
  <div class="not-found" v-else>
    <h1>没这首歌</h1>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useSonglistStore } from '@/stores/songlist';
import { onUpdated, ref } from 'vue';

const route = useRoute();
const songlistStore = useSonglistStore();
let song = ref();
song.value = songlistStore.originSonglist.find(song => song.id === Number.parseInt(route.params.id as string));

// 如果直接改了路由中的歌曲 ID 的话，就更新一下歌曲信息
onUpdated(() => {
  song.value = songlistStore.originSonglist.find(song => song.id === Number.parseInt(route.params.id as string));
})
</script>