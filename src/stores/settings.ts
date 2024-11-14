import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  // 首次运行
  const isFirstRun = ref(true);
  // 难度
  const rank = ref(["all"]);
  // 分类
  const category = ref(["all"]);
  // 难度多选
  const lvMultiple = ref(false);
  // 最低等级
  const lvMin = ref(0);
  // 最低等级带加号
  const lvMinPlus = ref(false);
  // 最高等级
  const lvMax = ref(0);
  // 最高等级带加号
  const lvMaxPlus = ref(false);
  // 版本
  const version = ref(["all"]);

  return {isFirstRun,rank,category,lvMultiple,lvMin,lvMinPlus,lvMax,lvMaxPlus,version}
});
