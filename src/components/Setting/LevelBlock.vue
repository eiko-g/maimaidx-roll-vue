<template>
  <div class="setting-block level">
    <h3 class="title">等级设置</h3>
    <!-- <p class="preview">
      等级预览：{{ settingStore.lvMin }}
      <span v-show="settingStore.lvMultiple"> ~ {{ settingStore.lvMax }}</span>
    </p> -->

    <div class="level-select">
      <label for="level-select-single" :class="['level-select-label', { active: !settingStore.lvMultiple }]">
        <input :checked="!settingStore.lvMultiple" @click="settingStore.lvMultiple = false" id="level-select-single" type="radio"
          name="level-select" value="false" />
        <span class="inner">单一难度</span>
      </label>
      <label for="level-select-multiple" :class="['level-select-label', { active: settingStore.lvMultiple }]">
        <input :checked="settingStore.lvMultiple" @click="settingStore.lvMultiple = true" id="level-select-multiple" type="radio"
          name="level-select" value="true" />
        <span class="inner">范围难度</span>
      </label>
    </div>

    <div v-show="!settingStore.lvMultiple">
      <div class="level-number single">
        <div class="level-number-block number min">
          <label for="level-number">抽选等级：</label>
          <input type="number" name="level-number" id="level-number" min="1" max="15" v-model="settingStore.lvMin" />
        </div>
      </div>
    </div>

    <div v-show="settingStore.lvMultiple">
      <div class="level-number lv-min">
        <div class="level-number-block number min">
          <label for="level-min">最低抽选等级：</label>
          <input type="number" name="level-min" id="level-min" min="1" max="15" step="0.1" v-model="settingStore.lvMin" />
        </div>

        <div class="level-number-block number max">
          <label for="level-max">最高抽选等级：</label>
          <input type="number" name="level-max" id="level-max" min="1" max="15" step="0.1" v-model="settingStore.lvMax" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings";
import { onMounted } from "vue";
const settingStore = useSettingsStore();

onMounted(() => {
  // 随便给个等级
  if (settingStore.lvMin === 0) {
    settingStore.lvMin = +((Math.random() * 14).toFixed(1));
    settingStore.lvMax = (settingStore.lvMin * 10 + 1) / 10;
  }
});
</script>

<style scoped lang="scss">
.level-select {
  display: flex;

  .level-select-label {
    user-select: none;
    margin-bottom: 10px;

    &:not(:last-child) {
      margin-right: 10px;
    }

    &:hover {
      cursor: pointer;
    }

    input[type="radio"] {
      display: none;
    }

    .inner {
      color: #666;
      display: block;
      border: 3px solid #ccc;
      padding: 5px;
    }

    input:checked~.inner {
      color: #fff;
      border-color: var(--color-border);
      background-color: var(--color-border);
    }
  }
}

.level-number {
  .level-number-block {
    &.number {
      label {
        display: block;
      }

      input[type="number"] {
        display: block;
        width: 100%;
        max-width: 150px;
        padding: 5px;
        margin: 10px 0;
        border: 3px solid #ccc;
        text-align: center;

        &:focus {
          outline: 0;
        }
      }
    }

    &.radio {
      display: flex;

      .level-radio-label {
        user-select: none;
        margin-bottom: 10px;

        &:not(:last-child) {
          margin-right: 10px;
        }

        &:hover {
          cursor: pointer;
        }

        input[type="radio"] {
          display: none;
        }

        .inner {
          color: #666;
          display: block;
          border: 3px solid #ccc;
          padding: 5px;
        }

        input:checked~.inner {
          color: #fb6099;
          border-color: #fb6099;
        }
      }
    }

    &.min {
      input[type="number"] {
        border-color: var(--color-A-dark);

        &:focus {
          box-shadow: 0 0 3px var(--color-A-dark);
        }
      }

      input[type="radio"]:checked~.inner {
        color: #333;
        border-color: var(--color-A-dark);
        background-color: var(--color-A-dark);
      }
    }

    &.max {
      input[type="number"] {
        border-color: var(--color-M-dark);

        &:focus {
          box-shadow: 0 0 3px var(--color-M-dark);
        }
      }

      input[type="radio"]:checked~.inner {
        color: #fff;
        border-color: var(--color-M-dark);
        background-color: var(--color-M-dark);
      }
    }
  }
}
</style>
