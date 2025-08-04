import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import type IMusic from '@/interface/IMusic';
import type IVersion from '@/interface/IVersion';
import type IGenre from '@/interface/IGenre';
import type ISongRollList from '@/interface/ISongRollList';

export const useSonglistStore = defineStore('songlist', () => {
  const songlistVersion: string | unknown = null;
  const version: IVersion[] | unknown = null;
  const genre: IGenre[] | unknown = null;
  const originSonglist: IMusic[] = [];
  const currentSong: IMusic = reactive({
    id: -1,
    genre: 107,
    name: '油婶么呢？',
    bpm: 114,
    disable: false,
    levels: {
      basic: 5,
      advanced: 8,
      expert: 10,
      master: 13,
      re_master: 14.6,
    },
    notes_data: {
      utage: {
        notes_designer: '-',
        notes_count: {
          tap: 1,
          hold: 1,
          slide: 4,
          touch: 5,
          break: 1,
          all: 4,
        },
      },
    },
    add_version: 13,
  });

  type RankKey = 'basic' | 'advanced' | 'expert' | 'master' | 're_master' | 'utage' | string;
  const currentRank = ref<RankKey>('re_master');
  const rollSonglist: ISongRollList[] = reactive([
    {
      id: 0,
      name: '完整歌单',
      difficult: 'basic',
      level: 0,
    },
  ]);

  return {
    songlistVersion,
    version,
    genre,
    originSonglist,
    currentSong,
    currentRank,
    rollSonglist,
  };
});
