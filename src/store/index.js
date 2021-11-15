import { createStore } from 'vuex'

export default createStore({
  state: {
    //非首次运行
    notFirstRun: false,
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
    // 原始歌单列表
    originalSongList: [],
    // 筛选过的歌单列表
    songList: [],
    // 当前抽到的歌
    currentSong: {
      "分类": undefined,
      "曲名": "油婶么呢？",
      "等级": {
        "B": "m",
        "A": "a",
        "E": "i",
        "M": "D",
        "R": "X"
      },
      "类型": "谱面类型",
      "版本": "版本",
      "封面": undefined,
    },
    currentDiffculty: ''
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
    setFirstRun(state) {
      state.notFirstRun = true;
    },
    saveOriginalSongList(state, list) {
      state.originalSongList = list;
    },
    saveSongList(state, list) {
      state.songList = list;
    },
    saveCurrentSong(state, song) {
      state.currentSong = song;
    },
    saveCurrentDiffculty(state, d) {
      state.currentDiffculty = d;
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
    },
    getSetting(state, getters) {
      return {
        rank: state.rank,
        category: state.category,
        lvMultiple: state.lvMultiple,
        lv: getters.getLv,
        version: state.version
      }
    },
    getFirstRun(state) {
      return state.notFirstRun;
    },
    getOriginalSongList(state) {
      return state.originalSongList;
    },
    getSongList(state) {
      return state.songList;
    },
    getCurrentSong(state) {
      return state.currentSong;
    },
    getCurrentDiffculty(state) {
      return state.currentDiffculty;
    }
  },
  modules: {
  }
})
