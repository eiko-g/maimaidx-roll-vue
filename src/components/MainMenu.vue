<template>
  <ul class="main-menu">
    <li class="menu-item"><router-link to="/roll">抽歌</router-link></li>
    <li class="menu-item"><router-link to="/list">曲目列表</router-link></li>
    <li class="menu-item"><router-link to="/custom">自定歌单</router-link></li>
    <li class="menu-item"><router-link to="/about">关于</router-link></li>
  </ul>
</template>

<style lang="scss" scoped>
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
          background-color: #a574e4;
          bottom: 0;
          border-radius: 999em 999em 0 0;
        }
      }
    }
  }
}
</style>