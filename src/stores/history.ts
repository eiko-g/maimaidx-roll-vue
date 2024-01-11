import { defineStore } from 'pinia';
import { reactive } from 'vue';

interface IHistory {
  cover: string;
  title: string;
  rank: string;
  lv: string | number;
}

export const useHistoryStore = defineStore('history', () => {
  let history: Array<IHistory> = reactive([]);
  return { history };
});
