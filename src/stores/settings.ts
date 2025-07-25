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
  // 最高等级
  const lvMax = ref(0);
  // 版本
  const version = ref(["all"]);

  return {isFirstRun,rank,category,lvMultiple,lvMin,lvMax,version}
});
