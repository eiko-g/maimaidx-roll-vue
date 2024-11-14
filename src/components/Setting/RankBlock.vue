<template>
  <div class="setting-block rank">
    <h3 class="title">难度设置</h3>

    <div class="ranks">
      <label class="rank-label all" for="rank-all">
        <input type="checkbox" name="rank" value="all" id="rank-all" class="rank all" />
        <span class="inner">All</span>
      </label>

      <label class="rank-label B" for="rank-B">
        <input type="checkbox" name="rank" value="B" id="rank-B" class="rank B" />
        <span class="inner">B</span>
      </label>

      <label class="rank-label A" for="rank-A">
        <input type="checkbox" name="rank" value="A" id="rank-A" class="rank A" />
        <span class="inner">A</span>
      </label>

      <label class="rank-label E" for="rank-E">
        <input type="checkbox" name="rank" value="E" id="rank-E" class="rank E" />
        <span class="inner">E</span>
      </label>

      <label class="rank-label M" for="rank-M">
        <input type="checkbox" name="rank" value="M" id="rank-M" class="rank M" />
        <span class="inner">M</span>
      </label>

      <label class="rank-label R" for="rank-R">
        <input type="checkbox" name="rank" value="R" id="rank-R" class="rank R" />
        <span class="inner">R</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { checkAll, checkOthers } from "@/mixins/checkInput";
import { onMounted } from "vue";
import { useSettingsStore } from "@/stores/settings";
const store = useSettingsStore();

// 保存难度设置
function saveRank() {
  const elements = document.querySelectorAll("input.rank:checked"),
    tempRank: Array<string> = [];
  elements.forEach((item) => {
    tempRank.push((item as HTMLInputElement).value);
  });
  store.rank = tempRank;
}

onMounted(() => {
  //#region 难度选项点击事件
  // 非 all 难度
  document.querySelectorAll("input.rank:not(input.all)").forEach((item) => {
    item.addEventListener("click", () => {
      checkOthers("input.rank", "input.rank.all");
    });
  });

  // all 难度
  document.querySelector("input.rank.all")!.addEventListener("click", () => {
    checkAll("input.rank", "input.rank.all");
  });

  // 所有难度选项
  document.querySelectorAll("input.rank").forEach((item) => {
    // 有变化时
    item.addEventListener("change", (el) => {
      console.log("Rank changed: ", el);
      saveRank();
    });
    // 载入时勾上已选择的难度
    (item as HTMLInputElement).checked = store.rank.includes(
      (item as HTMLInputElement).value
    );
  });
  //#endregion
});
</script>

<style lang="scss" scoped>
@import "@/style/mixin";

.ranks {
  display: flex;

  .rank-label {
    user-select: none;
    width: calc(1 / 6 * 100%);
    text-align: center;
    margin-bottom: 10px;

    &:not(:last-child) {
      margin-right: 10px;
    }

    &:hover {
      cursor: pointer;
    }

    input[type="checkbox"] {
      display: none;
    }

    .inner {
      display: block;
      border: 3px solid #ccc;
      padding: 5px;
    }

    &.all {
      @include input-label();
    }

    &.B {
      @include input-label(var(--color-B), var(--color-B-dark));
    }

    &.A {
      @include input-label(var(--color-A), var(--color-A-dark));
    }

    &.E {
      @include input-label(var(--color-E), var(--color-E-dark));
    }

    &.M {
      @include input-label(var(--color-M), var(--color-M-dark));
    }

    &.R {
      @include input-label(var(--color-R), var(--color-R-dark));
    }
  }
}
</style>
