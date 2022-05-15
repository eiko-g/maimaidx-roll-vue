import type ISetting from "@/interface/ISetting";
import { defineStore } from "pinia";

export const useSettingsStore = defineStore({
  id: 'settings',
  state: (): ISetting => ({
    // 首次运行
    isFirstRun: true,
    // 难度
    rank: ['all'],
    // 分类
    category: ['all'],
    // 难度多选
    lvMultiple: false,
    // 最低等级
    lvMin: 0,
    // 最低等级带加号
    lvMinPlus: false,
    // 最高等级
    lvMax: 0,
    // 最高等级带加号
    lvMaxPlus: false,
    // 版本
    version: ['all'],
  }),
  getters: {},
  actions: {}
});