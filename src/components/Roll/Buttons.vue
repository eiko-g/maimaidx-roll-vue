<template>
  <div class="buttons">
    <button :disabled="rollDisabled" class="button roll">按条件 Roll</button>
    <button @click="gotoSetting" class="button setting">设置</button>
    <button @click="changeState()" class="button random">随便来一首</button>
  </div>
</template>

<script>
export default {
  name: "Buttons",
  props: ["rollDisabled"],
  data() {
    return {
      disabled: true,
    };
  },
  methods: {
    changeState() {
      this.disabled = !this.disabled;
    },
    gotoSetting() {
      this.$router.push({ name: "Setting" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../source/scss/mixin";
button {
  display: block;
  background-color: transparent;
  border: 0;
  width: 100%;
  max-width: 300px;
  margin: 10px auto;
  padding: 5px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  border-radius: 99em;
  cursor: pointer;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &.roll {
    background-color: #b1d230;
    border: 3px solid #708e00;
    @include txsh(#708e00);
  }
  &.setting {
    background-color: #82d0ce;
    border: 3px solid #259bc6;
    @include txsh(#259bc6);
  }
  &.random {
    background-color: #f6b32c;
    border: 3px solid #e17400;
    @include txsh(#e17400);
  }
}
</style>