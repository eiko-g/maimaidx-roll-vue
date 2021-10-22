<template>
  <div class="loading">
    <div class="center">
      <p>{{ info }}</p>
      <img class="char" :src="imgScr" :alt="wife" />
    </div>
  </div>
</template>

<script>
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
      let wife = {
        Chiffon: "sd_chiffon.png",
        Milk: "sd_milk.png",
        Otohime: "sd_otohime.png",
        Ras: "sd_ras.png",
        Salt: "sd_salt.png",
        syama: "sd_shama.png",
      };
      let arr = ["Chiffon", "Milk", "Otohime", "Ras", "Salt", "syama"];
      this.shuffleArray(arr);
      this.wife = arr[0];
      this.imgScr = `./assets/img/char/${wife[arr[0]]}`;
    },
    async fetchSongList() {
      let response = await fetch("./data/maimaidxCN.json?ver=2021091801"),
        json = {};
      if (response.ok) {
        json = await response.json();
      } else {
        alert("HTTP-Error: " + response.status);
      }
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