import { createStore } from 'vuex'

export default createStore({
  state: {
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
    // 歌单（目前没用）
    songList: '',
    // 当前抽到的歌
    currentSong: {}
  },
  mutations: {
    saveRank(state, rank) {
      state.rank = rank;
    },
    saveCat(state, cat) {
      state.category = cat;
    },
    saveVer(state, ver) {
      state.version = ver;
    },
    saveLvMultiple(state, m) {
      state.lvMultiple = m;
    },
    saveLvMin(state, lv) {
      state.lvMin = lv;
    },
    saveLvMinPlus(state, plus) {
      state.lvMinPlus = plus;
    },
    saveLvMax(state, lv) {
      state.lvMax = lv;
    },
    saveLvMaxPlus(state, plus) {
      state.lvMaxPlus = plus;
    },
  },
  actions: {
  },
  getters: {
    getRank(state) {
      return state.rank;
    },
    getCat(state) {
      return state.category;
    },
    getVer(state) {
      return state.version;
    },
    getLv(state) {
      let obj = {
        lvMin: state.lvMin,
        lvMinPlus: state.lvMinPlus,
        lvMax: state.lvMax,
        lvMaxPlus: state.lvMaxPlus
      }
      return obj;
    },
    getLvMul(state) {
      return state.lvMultiple;
    }
  },
  modules: {
  }
})
