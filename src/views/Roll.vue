<template>
  <div class="roll">
    <keep-alive>
      <Result />
    </keep-alive>
    <SettingInfo :setting="setting" />
    <Buttons :rollDisabled="rollDisabled" />

    <div class="footer">
      <p @click="whatever">ver 0.01vue-20211011.01</p>
    </div>
    <!-- .footer -->
  </div>
</template>

<script>
import Result from "../components/Roll/Result.vue";
import SettingInfo from "../components/Roll/SettingInfo.vue";
import Buttons from "../components/Roll/Buttons.vue";
export default {
  name: "Roll",
  data() {
    return {
      rollDisabled: true,
      setting: {},
    };
  },
  components: {
    Result,
    SettingInfo,
    Buttons,
  },
  methods: {
    whatever() {
      this.rollDisabled = !this.rollDisabled;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.footer {
  color: #666;
  font-size: 12px;
  text-align: center;
}
</style>