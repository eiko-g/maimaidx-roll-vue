<template>
  <h2>载入日志</h2>
  <ul class="infolist">
    <InfoVue v-for="info in infoArray" :info="info" :key="info.time" />
  </ul>
</template>

<script lang="ts" setup>
import InfoVue from "@/components/Loading/Info.vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useSonglistStore } from "@/stores/songlist";
import type ISong from "@/interface/ISong";

const router = useRouter();
const store = useSonglistStore();

let go = ref(false);

onMounted(async () => {
  push("开始载入了捏");
  let response = await fetch("./data/maimaidxCN.json?ver=20220813.01"),
    json: IJson;
  if (response.ok) {
    push("歌单加载成功，正在处理");
    json = await response.json();
    //#region 给每首歌加个 id
    // 在这里做是因为我没拿到那些 bot 都有的 ID，所以就自己加个
    let id = 0;
    json.曲目列表.map((item: ISong) => {
      id++;
      item.id = id;
    });
    //#endregion
    console.log("加了 id 之后的 JSON", json);
    store.originSonglist = json.曲目列表;
    console.log("歌单载入完成");
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
});

interface IInfo {
  time: string;
  msg: string | null | undefined;
}

let infoArray: Array<IInfo> = reactive([]);

function transTime(input: Date): string {
  let date = input.toLocaleDateString(),
    time = input.toLocaleTimeString();

  return `${date} ${time}`;
}

function push(msg: string, type = "log") {
  infoArray.push({
    time: transTime(new Date()),
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
  data: number;
  曲目列表: Array<ISong>;
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
