<template>
  <h1>Detail Song</h1>
  <p>{{ $route.params.id }}</p>
  <pre>{{ song }}</pre>
  <a href="#" onclick="history.back()">Back</a>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useSonglistStore } from '@/stores/songlist';

const route = useRoute();
const songlistStore = useSonglistStore();
const song = songlistStore.originSonglist.find(song => song.id === Number.parseInt(route.params.id as string));
</script>