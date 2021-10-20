<template>
  <div class="setting-block setting-level">
    <h3 class="title">等级设置</h3>
    <div class="level-select">
      <label for="level-select-single" class="label-level-select">
        <input
          :checked="!lvMultiple"
          id="level-select-single"
          type="radio"
          name="level-select"
        />
        <div class="inner">单一难度</div>
      </label>
      <label for="level-select-multiple" class="label-level-select">
        <input
          :checked="lvMultiple"
          id="level-select-multiple"
          type="radio"
          name="level-select"
        />
        <div class="inner">范围难度</div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Level",
  data() {
    return {
      lvMultiple: false,
      level: {},
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>