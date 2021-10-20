<template>
  <div id="app">
    <div class="main-body">
      <router-view />
    </div>
    <div class="main-footer">
      <div class="main-footer-inner">
        <p>本网站非 &copy;SEGA 或 华立科技 官方制作，仅为爱好者作品</p>
        <p>
          项目地址：
          <a
            href="https://github.com/eiko-g/maimaidx-roll-vue"
            target="_blank"
            rel="noopener noreferrer"
          >
            GayHub
          </a>
        </p>
      </div>
    </div>
    <div class="background">
      <div class="corner">
        <div class="left-top"></div>
        <div class="bottom-right"></div>
      </div>
    </div>
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
  width: 90%;
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
.main-footer {
  position: relative;
  z-index: 100;
  margin-top: 100px;
  padding: 50px 50px 200px;
  background: #fff;
  box-shadow: 0 0 0 10px rgba(#fff, 0.4), 0 0 20px 0 rgba(#1c6fb0, 0.8);
  background-image: url("./assets/img/background/footer_bg.png");
  background-repeat: repeat-x;
  background-position: 0 100%;
  &-inner {
    color: #333;
    font-size: 14px;
    width: 100%;
    max-width: 1000px;
    margin: auto;
  }
}
.background {
  z-index: 1;
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  top: 0;
  .corner {
    .left-top,
    .bottom-right {
      background-repeat: no-repeat;
      position: fixed;
    }
    .left-top {
      left: 0;
      top: 0;
      width: 530px;
      height: 530px;
      background-image: url("./assets/img/background/corner_left.png");
    }
    .bottom-right {
      bottom: 0;
      right: 0;
      width: 560px;
      height: 580px;
      background-image: url("./assets/img/background/corner_right.png");
    }
  }
}
</style>
