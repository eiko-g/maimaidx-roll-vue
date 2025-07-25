<template>
  <h2>载入日志</h2>
  <ul class="infolist">
    <InfoVue v-for="info in infoArray" :info="info" :key="info.time" />
  </ul>
</template>

<script lang="ts" setup>
import InfoVue from "@/components/Loading/InfoBlock.vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useSonglistStore } from "@/stores/songlist";
import type IVersion from "@/interface/IVersion";
import type IGenre from "@/interface/IGenre";
import type IMusic from "@/interface/IMusic";

const router = useRouter();
const store = useSonglistStore();

const go = ref(false);

onMounted(async () => {
  push("开始载入了捏");
  push("歌单加载中……");
  const response = await fetch("./data/maiDX_CN/CN1.50-C.json?ver=20250708.01");
    let json: IJson;
  if (response.ok) {
    json = await response.json();
    push("歌单加载完成，正在处理");
    store.originSonglist = json.music;
    console.log("歌单载入完成");

    store.songlistVersion = json.songlist_version;
    store.version = json.version;
    store.genre = json.genre;

    // localStorage.setItem("songlist", JSON.stringify(json));
    // localStorage.setItem('last_cached_time', transTime());
    // push("已将歌单缓存到浏览器");
    go.value = true;
    push("准备完成，正在跳转~");
    setTimeout(() => {
      router.push({ name: "roll" });
    }, 800);
  } else {
    push("载入 JSON 炸了，HTTP-Error: " + response.status, "error");
    console.log("Response: ", response);
    alert("怎么载入这 JSON 还会出错？HTTP-Error: " + response.status);
  }
  // }
});

interface IInfo {
  time: string;
  msg: string | null | undefined;
}

const infoArray: Array<IInfo> = reactive([]);

function transTime(input: Date = new Date()): string {
  const date = input.toLocaleDateString(),
    time = input.toLocaleTimeString();

  return `${date} ${time}`;
}

function push(msg: string, type = "log") {
  infoArray.push({
    time: transTime(),
    msg: msg,
  });

  console.log("infoArray: ", infoArray);
  switch (type) {
    case "log":
      console.log("Loading log: ", msg);
      break;
    case "warn":
      console.warn("Loading log: ", msg);
      break;
    case "error":
      console.error("Loading log: ", msg);
      break;
    case "info":
      console.info("Loading log: ", msg);
      break;
    default:
      console.log("Loading log: ", msg);
      break;
  }
}

interface IJson {
  songlist_version: string;
  version: IVersion[];
  genre: IGenre[],
  music: IMusic[];
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 24px;
  line-height: 1.5;
  text-align: center;
}

.infolist {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
