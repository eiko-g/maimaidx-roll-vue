import { defineStore } from "pinia";
import type ISong from "@/interface/ISong";
import { reactive, ref } from "vue";

export const useSonglistStore = defineStore('songlist', () => {
  let originSonglist: Array<ISong> = [];
  let currentSong: ISong = reactive({
    id: -1,
    分类: "某个分类",
    曲名: "油婶么呢？",
    等级: {
      B: "m",
      A: "a",
      E: "i",
      M: "D",
      R: "X",
    },
    类型: "谱面类型",
    版本: "版本",
    封面: undefined,
  });

  let currentRank = ref('');
  let rollSonglist = ref([]);

  return { originSonglist, currentSong, currentRank, rollSonglist };
})