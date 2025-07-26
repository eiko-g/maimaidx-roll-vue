<template>
  <!-- <MainMenu></MainMenu> -->
  <div class="main-body">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
// import MainMenu from "./components/MainMenu.vue";

const pattern_bg: HTMLElement | null = document.querySelector('.pattern-bg');
let pattern_bg_postition = 5;
setInterval(() => {
  // console.log('pattern_bg_postition', pattern_bg_postition);

  if (pattern_bg_postition <= 100) {
    pattern_bg_postition += 5;
  } else {
    pattern_bg_postition = 5;
  }
  pattern_bg!.style.backgroundPosition = `${pattern_bg_postition}% 0`;
}, 1000);
</script>

<style lang="scss">
@use '@/style/preset';

:root {
  --color-B: #{preset.$color-B};
  --color-A: #{preset.$color-A};
  --color-E: #{preset.$color-E};
  --color-M: #{preset.$color-M};
  --color-R: #{preset.$color-R};

  --color-B-dark: #{preset.$color-B-dark};
  --color-A-dark: #{preset.$color-A-dark};
  --color-E-dark: #{preset.$color-E-dark};
  --color-M-dark: #{preset.$color-M-dark};
  --color-R-dark: #{preset.$color-R-dark};

  --color-bg: #{preset.$color-bg-uni};
  --color-border: #{preset.$color-border-uni};
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
  color: #053264;
  text-decoration: none;
}

.main-body {
  position: relative;
  z-index: 100;
  width: 80%;
  max-width: 600px;
  min-height: 90vh;
  margin: 100px auto;
  background-color: #fff;
  box-shadow:
    inset 0 0 5px rgba(#ffba42, 0.7),
    0 0 0 5px #183665,
    0 0 0 10px #fff,
    0 0 0 15px #ffba42,
    0 0 0 20px #fff,
    0 0 0 25px rgba(255, 255, 255, 0.4),
    0 0 20px 15px rgba(#183665, 0.7);
  border-radius: 10px;
  padding: 20px;
}
</style>
