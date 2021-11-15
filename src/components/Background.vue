<template>
  <div class="background">
    <div class="corner">
      <div class="left-top"></div>
      <div class="bottom-right"></div>
    </div>
    <div class="cats">
      <div class="milk"></div>
      <div class="shama"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Background'
}
</script>

<style lang="scss" scoped>
@import "../source/scss/mixin";
.background {
  z-index: 1;
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  top: 0;
  .cats {
    .milk,
    .shama {
      background-repeat: no-repeat;
      position: fixed;
      background-size: 100%;
      @include max-screen(900px) {
        display: none;
      }
    }
    .milk {
      width: 283px;
      height: 597px;
      top: 100px;
      left: 30px;
      background-image: url("../assets/img/background/milk_universe.png");
      @include max-screen(1200px) {
        width: 141.5px;
        height: 298.5px;
      }
    }
    .shama {
      width: 374px;
      height: 596px;
      top: 100px;
      right: 10px;
      background-image: url("../assets/img/background/shama_universe.png");
      @include max-screen(1200px) {
        width: 187px;
        height: 298px;
      }
    }
  }
  .corner {
    .left-top,
    .bottom-right {
      background-repeat: no-repeat;
      position: fixed;
      background-size: 100%;
    }
    .left-top {
      left: 0;
      top: 0;
      width: 530px;
      height: 530px;
      background-image: url("../assets/img/background/corner_left.png");
      @include max-screen(600px) {
        width: 265px;
        height: 265px;
      }
    }
    .bottom-right {
      bottom: 0;
      right: 0;
      width: 560px;
      height: 580px;
      background-image: url("../assets/img/background/corner_right.png");
      @include max-screen(600px) {
        width: 280px;
        height: 290px;
      }
    }
  }
}
</style>