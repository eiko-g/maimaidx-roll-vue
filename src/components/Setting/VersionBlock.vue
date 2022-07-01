<template>
  <div class="setting-block version">
    <h3 class="title">版本选择</h3>
    <div class="versions">
      <label for="version-all" class="version-label all">
        <input
          type="checkbox"
          name="版本"
          id="version-all"
          value="all"
          class="version all"
        />
        <div class="inner">全部</div>
      </label>

      <label for="version-无印" class="version-label 无印">
        <input
          type="checkbox"
          name="版本"
          id="version-无印"
          value="无印"
          class="version"
        />
        <div class="inner">无印</div>
      </label>

      <label for="version-无印Plus" class="version-label 无印Plus">
        <input
          type="checkbox"
          name="版本"
          id="version-无印Plus"
          value="无印+"
          class="version"
        />
        <div class="inner">无印+</div>
      </label>

      <label for="version-绿" class="version-label 绿">
        <input
          type="checkbox"
          name="版本"
          id="version-绿"
          value="绿"
          class="version"
        />
        <div class="inner">绿</div>
      </label>

      <label for="version-绿Plus" class="version-label 绿Plus">
        <input
          type="checkbox"
          name="版本"
          id="version-绿Plus"
          value="绿+"
          class="version"
        />
        <div class="inner">绿+</div>
      </label>

      <label for="version-橙" class="version-label 橙">
        <input
          type="checkbox"
          name="版本"
          id="version-橙"
          value="橙"
          class="version"
        />
        <div class="inner">橙</div>
      </label>

      <label for="version-橙Plus" class="version-label 橙Plus">
        <input
          type="checkbox"
          name="版本"
          id="version-橙Plus"
          value="橙+"
          class="version"
        />
        <div class="inner">橙+</div>
      </label>

      <label for="version-粉" class="version-label 粉">
        <input
          type="checkbox"
          name="版本"
          id="version-粉"
          value="粉"
          class="version"
        />
        <div class="inner">粉</div>
      </label>

      <label for="version-粉Plus" class="version-label 粉Plus">
        <input
          type="checkbox"
          name="版本"
          id="version-粉Plus"
          value="粉+"
          class="version"
        />
        <div class="inner">粉+</div>
      </label>

      <label for="version-紫" class="version-label 紫">
        <input
          type="checkbox"
          name="版本"
          id="version-紫"
          value="紫"
          class="version"
        />
        <div class="inner">紫</div>
      </label>

      <label for="version-紫Plus" class="version-label 紫Plus">
        <input
          type="checkbox"
          name="版本"
          id="version-紫Plus"
          value="紫+"
          class="version"
        />
        <div class="inner">紫+</div>
      </label>

      <label for="version-奶" class="version-label 奶">
        <input
          type="checkbox"
          name="版本"
          id="version-奶"
          value="奶"
          class="version"
        />
        <div class="inner">奶</div>
      </label>

      <label for="version-奶Plus" class="version-label 奶Plus">
        <input
          type="checkbox"
          name="版本"
          id="version-奶Plus"
          value="奶+"
          class="version"
        />
        <div class="inner">奶+</div>
      </label>

      <label for="version-FiNALE" class="version-label FiNALE">
        <input
          type="checkbox"
          name="版本"
          id="version-FiNALE"
          value="FiNALE"
          class="version"
        />
        <div class="inner">FiNALE</div>
      </label>

      <label for="version-DX" class="version-label DX">
        <input
          type="checkbox"
          name="版本"
          id="version-DX"
          value="DX"
          class="version"
        />
        <div class="inner">DX</div>
      </label>

      <label for="version-DX2021" class="version-label DX2021">
        <input
          type="checkbox"
          name="版本"
          id="version-DX2021"
          value="DX2021"
          class="version"
        />
        <div class="inner">DX2021</div>
      </label>

      <label for="version-DX2022" class="version-label DX2022">
        <input
          type="checkbox"
          name="版本"
          id="version-DX2022"
          value="DX2022"
          class="version"
        />
        <div class="inner">DX2022</div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { checkAll, checkOthers } from "@/mixins/checkInput";
import { useSettingsStore } from "@/stores/settings";
import { onMounted } from "vue";
const store = useSettingsStore();

// 保存版本设置
function saveVersion() {
  let elements = document.querySelectorAll("input.version:checked"),
    tempVer: Array<string> = [];
  elements.forEach((item) => {
    tempVer.push((item as HTMLInputElement).value);
  });
  store.version = tempVer;
}

onMounted(() => {
  //#region 版本选择事件
  // 非 all 版本
  document
    .querySelectorAll("input.version:not(input.version.all)")
    .forEach((item) => {
      item.addEventListener("click", () => {
        checkOthers("input.version", "input.version.all");
      });
    });

  // all 版本
  document.querySelector("input.version.all")!.addEventListener("click", () => {
    checkAll("input.version", "input.version.all");
  });

  // 所有版本选项
  document.querySelectorAll("input.version").forEach((item) => {
    (item as HTMLInputElement).addEventListener("change", (el) => {
      console.log("Version changed: ", el);
      saveVersion();
    });

    // 载入时勾上保存的版本
    (item as HTMLInputElement).checked = store.version.includes(
      (item as HTMLInputElement).value
    );
  });
});
</script>

<style scoped lang="scss">
@import "@/style/mixin";
.versions {
  display: flex;
  flex-wrap: wrap;
  .version-label {
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
    @include input-label();
  }
}
</style>
