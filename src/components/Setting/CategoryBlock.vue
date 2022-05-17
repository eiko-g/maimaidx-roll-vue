<template>
  <div class="setting-block category">
    <h3 class="title">分类选择</h3>
    <div class="cats">
      <label for="cat-all" class="cat-label all">
        <input
          type="checkbox"
          class="cat all"
          id="cat-all"
          name="category"
          value="all"
        />
        <div class="inner">全分类</div>
      </label>
      <label for="cat-pops_anime" class="cat-label pops_anime">
        <input
          type="checkbox"
          class="cat pops_anime"
          id="cat-pops_anime"
          name="category"
          value="pops_anime"
        />
        <div class="inner">动画 &amp; 流行</div>
      </label>
      <label for="cat-niconico" class="cat-label niconico">
        <input
          type="checkbox"
          class="cat niconico"
          id="cat-niconico"
          name="category"
          value="niconico"
        />
        <div class="inner">nico &amp; V家</div>
      </label>
      <label for="cat-toho" class="cat-label toho">
        <input
          type="checkbox"
          class="cat toho"
          id="cat-toho"
          name="category"
          value="toho"
        />
        <div class="inner">东方 Project</div>
      </label>
      <label for="cat-variety" class="cat-label variety">
        <input
          type="checkbox"
          class="cat variety"
          id="cat-variety"
          name="category"
          value="variety"
        />
        <div class="inner">其他游戏</div>
      </label>
      <label for="cat-maimai" class="cat-label maimai">
        <input
          type="checkbox"
          class="cat maimai"
          id="cat-maimai"
          name="category"
          value="maimai"
        />
        <div class="inner">maimai</div>
      </label>
      <label for="cat-gekichu" class="cat-label gekichu">
        <input
          type="checkbox"
          class="cat gekichu"
          id="cat-gekichu"
          name="category"
          value="gekichu"
        />
        <div class="inner">音击 &amp; 中二</div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { checkAll, checkOthers } from "@/mixins/checkInput";
import { onMounted } from "vue";
import { useSettingsStore } from "@/stores/settings";

const store = useSettingsStore();

// 保存分类设置
function saveCat() {
  let elements = document.querySelectorAll("input.cat:checked"),
    tempCat: Array<string> = [];
  elements.forEach((item) => {
    tempCat.push((item as HTMLInputElement).value);
  });
  store.category = tempCat;
}

onMounted(() => {
  //#region 分类选择事件
  // 非 all 分类
  document.querySelectorAll("input.cat:not(input.cat.all)").forEach((item) => {
    item.addEventListener("click", () => {
      checkOthers("input.cat", "input.cat.all");
    });
  });

  // all 分类
  document.querySelector("input.cat.all")!.addEventListener("click", () => {
    checkAll("input.cat", "input.cat.all");
  });

  // 所有分类选项
  document.querySelectorAll("input.cat").forEach((item) => {
    (item as HTMLInputElement).addEventListener("change", (el) => {
      console.log("Cat changed: ", el);
      saveCat();
    });

    // 载入时勾上保存的分类
    (item as HTMLInputElement).checked = store.category.includes(
      (item as HTMLInputElement).value
    );
  });
});
</script>

<style scoped lang="scss">
@import "@/style/mixin";
.cats {
  display: flex;
  flex-wrap: wrap;
  .cat-label {
    user-select: none;
    &:not(:last-child) {
      margin-right: 10px;
    }
    margin-bottom: 10px;
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
    &.pops_anime {
      @include input-label(#ccc, #ff972a, #ff972a);
    }
    &.niconico {
      @include input-label(#ccc, #09c8d4, #09c8d4);
    }
    &.toho {
      @include input-label(#ccc, #ad59ee, #ad59ee);
    }
    &.variety {
      @include input-label(#ccc, #42de6a, #42de6a);
    }
    &.maimai {
      @include input-label(#ccc, #f74949, #f74949);
    }
    &.gekichu {
      @include input-label(#ccc, #3585fe, #3585fe);
    }
  }
}
</style>
