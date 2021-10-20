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
    lvMin: '',
    // 最低等级带加号
    lvMinPlus: 'off',
    // 最高等级
    lvMax: '',
    // 最高等级带加号
    lvMaxPlus: 'off',
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
    }
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
    }
  },
  modules: {
  }
})
