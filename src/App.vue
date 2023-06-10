<template>
  <!-- <MainMenu></MainMenu> -->
  <div class="main-body">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import MainMenu from "./components/MainMenu.vue";
</script>

<style lang="scss">
@import '@/style/preset';

:root {
  --color-B: #{$color-B};
  --color-A: #{$color-A};
  --color-E: #{$color-E};
  --color-M: #{$color-M};
  --color-R: #{$color-R};

  --color-B-dark: #{$color-B-dark};
  --color-A-dark: #{$color-A-dark};
  --color-E-dark: #{$color-E-dark};
  --color-M-dark: #{$color-M-dark};
  --color-R-dark: #{$color-R-dark};

  --color-bg: #{$color-bg-uni};
  --color-border: #{$color-border-uni};
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  // background: #57c0ff;
  margin: 0;
  padding: 0;
}

a {
  color: #ff8db0;
  text-decoration: none;
}

.main-body {
  position: relative;
  z-index: 100;
  width: 80%;
  max-width: 600px;
  min-height: 90vh;
  margin: 50px auto;
  background-color: #fff;
  box-shadow: inset 0 0 5px rgba(111, 52, 176, .7), 0 0 0 5px #fbfb71, 0 0 0 10px #fff, 0 0 0 15px #b98bf8,
    0 0 0 20px #fff, 0 0 0 25px rgba(255, 255, 255, 0.4),
    0 0 20px 15px rgba(111, 52, 176, .7);
  border-radius: 10px;
  padding: 20px;
}
</style>
