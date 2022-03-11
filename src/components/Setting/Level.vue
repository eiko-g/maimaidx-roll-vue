<template>
  <div class="setting-block setting-level">
    <h3 class="title">等级设置</h3>
    <div class="review">
      <p>
        等级预览：{{ level.lvMin }}
        <span v-show="level.lvMinPlus">+</span>
        <span v-show="lvMultiple">
          ~ {{ level.lvMax }}
          <span v-show="level.lvMaxPlus">+</span>
        </span>
      </p>
    </div>
    <div class="level-select">
      <label
        for="level-select-single"
        :class="['level-select-label', { active: !lvMultiple }]"
      >
        <input
          :checked="!lvMultiple"
          @click="switchMultiple(false)"
          id="level-select-single"
          type="radio"
          name="level-select"
          value="false"
        />
        <span class="inner">单一难度</span>
      </label>
      <label
        for="level-select-multiple"
        :class="['level-select-label', { active: lvMultiple }]"
      >
        <input
          :checked="lvMultiple"
          @click="switchMultiple(true)"
          id="level-select-multiple"
          type="radio"
          name="level-select"
          value="true"
        />
        <span class="inner">范围难度</span>
      </label>
    </div>

    <div v-show="!lvMultiple">
      <div class="level-number single">
        <div class="level-number-block number min">
          <label for="level-number">抽选等级：</label>
          <input
            type="number"
            name="level-number"
            id="level-number"
            min="1"
            max="15"
            v-model="level.lvMin"
          />
        </div>
        <p>抽选等级带加号？</p>
        <div class="level-number-block radio min">
          <label class="level-radio-label" for="level-number-plus-no">
            <input
              :checked="!level.lvMinPlus"
              @click="
                setLvMinPlus(false);
                saveLvMinPlus(false);
              "
              type="radio"
              name="level-number-plus"
              id="level-number-plus-no"
              value="false"
            />
            <span class="inner">不带 + 号</span>
          </label>
          <label class="level-radio-label" for="level-number-plus-yes">
            <input
              :checked="level.lvMinPlus"
              @click="
                setLvMinPlus(true);
                saveLvMinPlus(true);
              "
              type="radio"
              name="level-number-plus"
              id="level-number-plus-yes"
              value="true"
            />
            <span class="inner">带 + 号</span>
          </label>
        </div>
      </div>
    </div>

    <div v-show="lvMultiple">
      <div class="level-number lv-min">
        <div class="level-number-block number min">
          <label for="level-min">最低抽选等级：</label>
          <input
            type="number"
            name="level-min"
            id="level-min"
            min="1"
            max="15"
            v-model="level.lvMin"
          />
        </div>
        <p>最低等级带加号？</p>
        <div class="level-number-block radio min">
          <label class="level-radio-label" for="level-min-plus-no">
            <input
              :checked="!level.lvMinPlus"
              @click="
                setLvMinPlus(false);
                saveLvMinPlus(false);
              "
              type="radio"
              name="level-min-plus"
              id="level-min-plus-no"
              value="false"
            />
            <span class="inner">不带 + 号</span>
          </label>
          <label class="level-radio-label" for="level-min-plus-yes">
            <input
              :checked="level.lvMinPlus"
              @click="
                setLvMinPlus(true);
                saveLvMinPlus(true);
              "
              type="radio"
              name="level-min-plus"
              id="level-min-plus-yes"
              value="true"
            />
            <span class="inner">带 + 号</span>
          </label>
        </div>
        <div class="level-number-block number max">
          <label for="level-max">最高抽选等级：</label>
          <input
            type="number"
            name="level-max"
            id="level-max"
            min="1"
            max="15"
            v-model="level.lvMax"
          />
        </div>
        <p>最高等级带加号？</p>
        <div class="level-number-block radio max">
          <label class="level-radio-label" for="level-max-plus-no">
            <input
              :checked="!level.lvMaxPlus"
              @click="
                setLvMaxPlus(false);
                saveLvMaxPlus(false);
              "
              type="radio"
              name="level-max-plus"
              id="level-max-plus-no"
              value="false"
            />
            <span class="inner">不带 + 号</span>
          </label>
          <label class="level-radio-label" for="level-max-plus-yes">
            <input
              :checked="level.lvMaxPlus"
              @click="
                setLvMaxPlus(true);
                saveLvMaxPlus(true);
              "
              type="radio"
              name="level-max-plus"
              id="level-max-plus-yes"
              value="true"
            />
            <span class="inner">带 + 号</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Level",
};
</script>

<script setup>
import {useStore} from "vuex";
import {ref, reactive, onMounted} from "vue";
const store = useStore();

let lvMultiple = ref(store.getters.getLvMul);
let level = reactive(store.getters.getLv);

console.log(lvMultiple, level);

// 随便给个等级
function randomLevel() {
  if (level.lvMin === 0) {
    return Math.floor(Math.random() * 14) + 1;
  }
}

// 切换是否多选等级
function switchMultiple(state) {
  lvMultiple.value = state;
}

// 最低等级带加号
function setLvMinPlus(state) {
  level.lvMinPlus = state;
}
// 最高等级带加号
function setLvMaxPlus(state) {
  level.lvMaxPlus = state;
}

function saveLvMin(lv) {
  store.commit("saveLvMin", lv);
  console.log("Save LvMin", level.lvMin);
}
function saveLvMinPlus(state) {
  store.commit("saveLvMinPlus", state);
  console.log("Save LvMinPlus", level.lvMinPlus);
}
function saveLvMax(lv) {
  store.commit("saveLvMax", lv);
  console.log("Save LvMax", level.lvMax);
}
function saveLvMaxPlus(state) {
  store.commit("saveLvMaxPlus", state);
  console.log("Save LvMaxPlus", level.lvMaxPlus);
}
function saveLvMul() {
  // 就尼玛离谱，如果直接获取 input.value 的话会传成字符串而不是布尔值
  store.commit("saveLvMultiple", lvMultiple.value);
  console.log("Save LvMul", lvMultiple.value);
}

// 初始化时如果没有设置等级就随便来个
if (level.lvMin <= 0) {
  level.lvMin = randomLevel();
  saveLvMin(level.lvMin);
}
if (level.lvMax <= 0) {
  level.lvMax = Number(level.lvMin) + 1;
  saveLvMax(level.lvMax);
}

// setup 时 dom 还没渲染出来，要等 Mounted 之后才能绑定事件
onMounted(()=>{
  // 绑定切换范围的事件
  document.querySelectorAll('input[name="level-select"]').forEach((item) => {
    item.addEventListener("click", () => {
      saveLvMul();
    });
  });
// 绑定保存等级的事件
  document.querySelectorAll("#level-number, #level-min").forEach((item) => {
    item.addEventListener("change", () => {
      saveLvMin(item.value);
    });
  });
  document.querySelectorAll("#level-max").forEach((item) => {
    item.addEventListener("change", () => {
      saveLvMax(item.value);
    });
  });
});
</script>


<style lang="scss" scoped>
.level-select {
  display: flex;
  .level-select-label {
    user-select: none;
    &:not(:last-child) {
      margin-right: 10px;
    }
    margin-bottom: 10px;
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
    input:checked ~ .inner {
      color: #fb6099;
      border-color: #fb6099;
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
        &:not(:last-child) {
          margin-right: 10px;
        }
        margin-bottom: 10px;
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
        input:checked ~ .inner {
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
      input[type="radio"]:checked ~ .inner {
        color: #000;
        border-color: var(--color-A-dark);
      }
    }
    &.max {
      input[type="number"] {
        border-color: var(--color-M-dark);
        &:focus {
          box-shadow: 0 0 3px var(--color-M-dark);
        }
      }
      input[type="radio"]:checked ~ .inner {
        color: #000;
        border-color: var(--color-M-dark);
      }
    }
  }
}
</style>
