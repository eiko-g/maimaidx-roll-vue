import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  // 首次运行
  let isFirstRun = ref(true);
  // 难度
  let rank = ref(["all"]);
  // 分类
  let category = ref(["all"]);
  // 难度多选
  let lvMultiple = ref(false);
  // 最低等级
  let lvMin = ref(0);
  // 最低等级带加号
  let lvMinPlus = ref(false);
  // 最高等级
  let lvMax = ref(0);
  // 最高等级带加号
  let lvMaxPlus = ref(false);
  // 版本
  let version = ref(["all"]);

  return {isFirstRun,rank,category,lvMultiple,lvMin,lvMinPlus,lvMax,lvMaxPlus,version}
});
