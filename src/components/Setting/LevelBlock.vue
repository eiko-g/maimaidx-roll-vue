<template>
  <div class="setting-block level">
    <h3 class="title">等级设置</h3>
    <p class="preview">
      等级预览：{{ store.lvMin }}<span v-show="store.lvMinPlus">+</span>
      <span v-show="store.lvMultiple">
        ~ {{ store.lvMax }}<span v-show="store.lvMaxPlus">+</span>
      </span>
    </p>

    <div class="level-select">
      <label for="level-select-single" :class="['level-select-label', { active: !store.lvMultiple }]">
        <input :checked="!store.lvMultiple" @click="store.lvMultiple = false" id="level-select-single" type="radio"
          name="level-select" value="false" />
        <span class="inner">单一难度</span>
      </label>
      <label for="level-select-multiple" :class="['level-select-label', { active: store.lvMultiple }]">
        <input :checked="store.lvMultiple" @click="store.lvMultiple = true" id="level-select-multiple" type="radio"
          name="level-select" value="true" />
        <span class="inner">范围难度</span>
      </label>
    </div>

    <div v-show="!store.lvMultiple">
      <div class="level-number single">
        <div class="level-number-block number min">
          <label for="level-number">抽选等级：</label>
          <input type="number" name="level-number" id="level-number" min="1" max="15" v-model="store.lvMin" />
        </div>
        <p>抽选等级带加号？</p>
        <div class="level-number-block radio min">
          <label class="level-radio-label" for="level-number-plus-no">
            <input :checked="!store.lvMinPlus" @click="store.lvMinPlus = false" type="radio" name="level-number-plus"
              id="level-number-plus-no" value="false" />
            <span class="inner">不带 + 号</span>
          </label>
          <label class="level-radio-label" for="level-number-plus-yes">
            <input :checked="store.lvMinPlus" @click="store.lvMinPlus = true" type="radio" name="level-number-plus"
              id="level-number-plus-yes" value="true" />
            <span class="inner">带 + 号</span>
          </label>
        </div>
      </div>
    </div>

    <div v-show="store.lvMultiple">
      <div class="level-number lv-min">
        <div class="level-number-block number min">
          <label for="level-min">最低抽选等级：</label>
          <input type="number" name="level-min" id="level-min" min="1" max="15" v-model="store.lvMin" />
        </div>
        <p>最低等级带加号？</p>
        <div class="level-number-block radio min">
          <label class="level-radio-label" for="level-min-plus-no">
            <input :checked="!store.lvMinPlus" @click="store.lvMinPlus = false" type="radio" name="level-min-plus"
              id="level-min-plus-no" value="false" />
            <span class="inner">不带 + 号</span>
          </label>
          <label class="level-radio-label" for="level-min-plus-yes">
            <input :checked="store.lvMinPlus" @click="store.lvMinPlus = true" type="radio" name="level-min-plus"
              id="level-min-plus-yes" value="true" />
            <span class="inner">带 + 号</span>
          </label>
        </div>
        <div class="level-number-block number max">
          <label for="level-max">最高抽选等级：</label>
          <input type="number" name="level-max" id="level-max" min="1" max="15" v-model="store.lvMax" />
        </div>
        <p>最高等级带加号？</p>
        <div class="level-number-block radio max">
          <label class="level-radio-label" for="level-max-plus-no">
            <input :checked="!store.lvMaxPlus" @click="store.lvMaxPlus = false" type="radio" name="level-max-plus"
              id="level-max-plus-no" value="false" />
            <span class="inner">不带 + 号</span>
          </label>
          <label class="level-radio-label" for="level-max-plus-yes">
            <input :checked="store.lvMaxPlus" @click="store.lvMaxPlus = true" type="radio" name="level-max-plus"
              id="level-max-plus-yes" value="true" />
            <span class="inner">带 + 号</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings";
import { onMounted } from "vue";
const store = useSettingsStore();

onMounted(() => {
  // 随便给个等级
  if (store.lvMin === 0) {
    store.lvMin = Math.floor(Math.random() * 14) + 1;
    store.lvMax = store.lvMin + 1;
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
