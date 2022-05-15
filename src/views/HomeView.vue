<template>
  <p>Home view</p>
  <p>Counter: {{ counterStore.counter }}</p>
  <p>Double: {{ counterStore.doubleCount }}</p>
  <button @click="counterStore.increment()">+1</button>
  <button @click="load">Load</button>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();

function load() {
  fetch("/data/maimai_songs.json")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error("Fetch error: ", e);
    });
}
</script>
