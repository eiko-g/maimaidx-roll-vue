<template>
  <div class="main-body">
    <router-view />
  </div>
</template>

<style lang="scss">
:root {
  --color-B: #ccffcc;
  --color-A: #ffdd99;
  --color-E: #ffccf7;
  --color-M: #eeccff;
  --color-R: #e9e6ff;

  --color-B-dark: #6fd43d;
  --color-A-dark: #f8b709;
  --color-E-dark: #ff818d;
  --color-M-dark: #9f51dc;
  --color-R-dark: #c346e7;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background: #57c0ff;
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
  box-shadow: 0 0 0 5px #fc9494, 0 0 0 10px #fff, 0 0 0 15px #86d2fe,
    0 0 0 20px #fff, 0 0 0 25px rgba(255, 255, 255, 0.4),
    0 0 20px 15px rgba(#1c6fb0, 0.8);
  border-radius: 10px;
  padding: 20px;
}
</style>
