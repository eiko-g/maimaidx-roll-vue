<template>
  <ul class="main-menu">
    <li class="menu-item"><router-link to="/roll">Roll</router-link></li>
    <li class="menu-item"><router-link to="/about">About</router-link></li>
  </ul>
  <div class="main-body">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

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

  --color-border: #2b2ea3;
  --color-bg: #319df8;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background: #57c0ff;
  margin: 0;
  padding: 0;
}

a {
  color: #ff8db0;
  text-decoration: none;
}

.main-menu {
  position: relative;
  z-index: 100;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  background-color: #fff;
  width: 80%;
  max-width: 1000px;
  padding: 0 30px;
  margin: 30px auto;
  border-radius: 9999em;
  box-shadow: 12px 12px 0 rgba(#000, .2);

  .menu-item {
    font-size: 20px;
    font-weight: bold;
    background-color: #fff;
    list-style: none;

    display: flex;
    align-items: center;

    &:not(:first-child) {
      margin-left: 20px;
    }

    &:not(:last-child) {
      &::after {
        content: '';
        display: block;
        width: 1px;
        height: 14px;
        background-color: #e5e5e5;
        margin-left: 20px;
      }
    }

    a {
      color: #0b3871;
      padding: 15px 0;
      position: relative;
      display: inline-block;

      &.router-link-active {
        &::before {
          content: '';
          position: absolute;
          display: block;
          width: 100%;
          height: 5px;
          background-color: #ff8db0;
          bottom: 0;
          border-radius: 999em 999em 0 0;
        }
      }
    }
  }
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
