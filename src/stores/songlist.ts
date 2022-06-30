import { defineStore } from "pinia";
import type ISong from "@/interface/ISong";
import { toRaw } from "vue";

export const useSonglistStore = defineStore({
  id: "songlist",
  state: (): IState => ({
    originSonglist: [],
    currentSong: {
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
    },
    currentRank: "",
    rollSonglist: [],
  }),
  getters: {
    // !!AnyScript
    getRawRollsonglist(state): any {
      return toRaw(state.rollSonglist);
    },
  },
  actions: {},
});

interface IState {
  originSonglist: Array<ISong>;
  currentSong: ISong;
  currentRank: string;
  rollSonglist: Array<any>;
}
