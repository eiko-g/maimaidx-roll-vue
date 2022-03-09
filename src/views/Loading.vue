<template>
  <div class="loading">
    <div class="center">
      <p>{{ info }}</p>
      <img class="char" :src="imgScr" :alt="wifeName" />
    </div>
  </div>
</template>

<script>


export default {
  name: "Loading",
  methods: {


  },
  mounted() {
    this.fetchSongList();
  },
};
</script>

<script setup>
import shuffleArray from "../mixins/shuffleArray";
import wife from "../mixins/wife";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
const store = useStore();
const router = useRouter();

let info = ref("歌曲列表载入中……"),
    imgScr = ref(""),
    wifeName = ref("");
let arr = ["Chiffon", "Milk", "Otohime", "Ras", "Salt", "shama"];
shuffleArray(arr);
wifeName.value = arr[0];
imgScr.value = wife[arr[0]];

async function fetchSongList() {
  let response = await fetch("./data/maimaidxCN.json?ver=2022021301.01"),
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
  console.log('加了 id 之后的 JSON',json);
  store.commit("saveOriginalSongList", json);
  info.value = "载入完成，正在跳转~";
  setTimeout(() => {
    router.push({ name: "Roll" });
  }, 500);
}

onMounted(fetchSongList);
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