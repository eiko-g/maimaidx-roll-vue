import { defineStore } from 'pinia';
import type ISong from '@/interface/ISong';
import { reactive, ref, type Ref } from 'vue';
import type ISongRollList from '@/interface/ISongRollList';

export const useSonglistStore = defineStore('songlist', () => {
  let originSonglist: Array<ISong> = [];
  let currentSong: ISong = reactive({
    id: -1,
    分类: '某个分类',
    曲名: '油婶么呢？',
    等级: {
      B: '5',
      A: '8',
      E: '10',
      M: '13',
      R: '14+'
    },
    类型: '谱面类型',
    版本: '版本',
    封面: undefined
  });

  let currentRank = ref('M');
  let rollSonglist = reactive([
    {
      id: 0,
      name: '完整歌单'
    }
  ]);

  let version: Ref<string | null> = ref(null);

  return { originSonglist, currentSong, currentRank, rollSonglist, version };
});
