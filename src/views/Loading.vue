<template>
  <div class="loading">
    <div class="center">
      <p>{{ info }}</p>
      <img class="char" :src="imgScr" :alt="wife" />
    </div>
  </div>
</template>

<script>
import shuffleArray from "../mixins/shuffleArray";
import wife from "../mixins/wife";

export default {
  name: "Loading",
  data() {
    return {
      info: "歌曲列表载入中……",
      imgScr: "",
      wife: "",
    };
  },
  methods: {
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
    randomImg() {
      let arr = ["Chiffon", "Milk", "Otohime", "Ras", "Salt", "shama"];
      shuffleArray(arr);
      this.wife = arr[0];
      this.imgScr = wife[arr[0]];
    },
    async fetchSongList() {
      let response = await fetch("./data/maimaidxCN.json?ver=2021111301"),
        json = {};
      if (response.ok) {
        json = await response.json();
      } else {
        alert("HTTP-Error: " + response.status);
      }
      //#region 给每首歌加个 id
      // 在这里做是因为我没拿到那些 bot 都有的 ID，所以就自己加个
      let id = 0;
      json.曲目列表.map(item=>{
        id++;
        item.id = id;
      });
      //#endregion
      console.log(json);
      this.$store.commit("saveOriginalSongList", json);
      this.info = "载入完成，正在跳转~";
      setTimeout(() => {
        this.$router.push({ name: "Roll" });
      }, 500);
    },
  },
  mounted() {
    this.randomImg();
    this.fetchSongList();
  },
};
</script>

<style lang="scss" scoped>
@import "../source/scss/mixin";
.loading {
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  .center {
    margin-top: 50px;
    p {
      color: #fff;
      font-size: 24px;
      text-align: center;
      @include txsh();
    }
    .char {
      display: block;
      margin: auto;
    }
  }
}
</style>