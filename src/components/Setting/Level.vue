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
          @click="swtichMultiple(false)"
          id="level-select-single"
          type="radio"
          name="level-select"
          value="false"
        />
        <div class="inner">单一难度</div>
      </label>
      <label
        for="level-select-multiple"
        :class="['level-select-label', { active: lvMultiple }]"
      >
        <input
          :checked="lvMultiple"
          @click="swtichMultiple(true)"
          id="level-select-multiple"
          type="radio"
          name="level-select"
          value="true"
        />
        <div class="inner">范围难度</div>
      </label>
    </div>

    <div v-show="!lvMultiple">
      <div class="level-number single">
        <div class="level-number-block number">
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
        <div class="level-number-block radio">
          <label class="level-radio-label" for="level-number-plus-no">
            <input
              :checked="!this.level.lvMinPlus"
              @click="
                setLvMinPlus(false);
                saveLvMinPlus(false);
              "
              type="radio"
              name="level-number-plus"
              id="level-number-plus-no"
              value="false"
            />
            <div class="inner">不带 + 号</div>
          </label>
          <label class="level-radio-label" for="level-number-plus-yes">
            <input
              :checked="this.level.lvMinPlus"
              @click="
                setLvMinPlus(true);
                saveLvMinPlus(true);
              "
              type="radio"
              name="level-number-plus"
              id="level-number-plus-yes"
              value="true"
            />
            <div class="inner">带 + 号</div>
          </label>
        </div>
      </div>
    </div>

    <div v-show="lvMultiple">
      <div class="level-number min">
        <div class="level-number-block number">
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
        <div class="level-number-block radio">
          <label class="level-radio-label" for="level-min-plus-no">
            <input
              :checked="!this.level.lvMinPlus"
              @click="
                setLvMinPlus(false);
                saveLvMinPlus(false);
              "
              type="radio"
              name="level-min-plus"
              id="level-min-plus-no"
              value="false"
            />
            <div class="inner">不带 + 号</div>
          </label>
          <label class="level-radio-label" for="level-min-plus-yes">
            <input
              :checked="this.level.lvMinPlus"
              @click="
                setLvMinPlus(true);
                saveLvMinPlus(true);
              "
              type="radio"
              name="level-min-plus"
              id="level-min-plus-yes"
              value="true"
            />
            <div class="inner">带 + 号</div>
          </label>
        </div>
        <div class="level-number-block number">
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
        <div class="level-number-block radio">
          <label class="level-radio-label" for="level-max-plus-no">
            <input
              :checked="!this.level.lvMaxPlus"
              @click="
                setLvMaxPlus(false);
                saveLvMaxPlus(false);
              "
              type="radio"
              name="level-max-plus"
              id="level-max-plus-no"
              value="false"
            />
            <div class="inner">不带 + 号</div>
          </label>
          <label class="level-radio-label" for="level-max-plus-yes">
            <input
              :checked="this.level.lvMaxPlus"
              @click="
                setLvMaxPlus(true);
                saveLvMaxPlus(true);
              "
              type="radio"
              name="level-max-plus"
              id="level-max-plus-yes"
              value="true"
            />
            <div class="inner">带 + 号</div>
          </label>
        </div>
      </div>
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
  methods: {
    /**
     * 一些辅助类的
     */
    // 切换是否多选等级
    swtichMultiple(state) {
      this.lvMultiple = state;
    },
    // 随机填个等级
    randomLevel() {
      if (this.level.lvMin === 0) {
        return Math.floor(Math.random() * 14) + 1;
      }
    },

    /**
     * 设置类的
     */
    // 最低等级带加号
    setLvMinPlus(state) {
      this.level.lvMinPlus = state;
    },
    // 最高等级带加号
    setLvMaxPlus(state) {
      this.level.lvMaxPlus = state;
    },

    // 获取等级设置
    getLv() {
      this.level = this.$store.getters.getLv;
      console.log("Get Lv", this.level);
    },
    getLvMul() {
      this.lvMultiple = this.$store.getters.getLvMul;
      console.log("Get LvMul", this.lvMultiple);
    },

    /**
     * 保存等级设置
     */
    saveLvMin(lv) {
      this.$store.commit("saveLvMin", lv);
      console.log("Save LvMin", this.level.lvMin);
    },
    saveLvMinPlus(state) {
      this.$store.commit("saveLvMinPlus", state);
      console.log("Save LvMinPlus", this.level.lvMinPlus);
    },
    saveLvMax(lv) {
      this.$store.commit("saveLvMax", lv);
      console.log("Save LvMax", this.level.lvMax);
    },
    saveLvMaxPlus(state) {
      this.$store.commit("saveLvMaxPlus", state);
      console.log("Save LvMaxPlus", this.level.lvMaxPlus);
    },
    saveLvMul() {
      let element = document.querySelector(
        'input[name="level-select"]:checked'
      );
      this.$store.commit("saveLvMultiple", element.value);
      console.log("Save LvMul");
    },
  },
  created() {
    this.getLv();
    this.getLvMul();
  },
  mounted() {
    // 如果没有设置就随便给个等级
    if (!this.level.lvMin) {
      this.level.lvMin = this.randomLevel();
    }
    if (!this.level.lvMax) {
      this.level.lvMax = Number(this.level.lvMin) + 1;
    }

    // 绑定切换范围的事件
    document.querySelectorAll('input[name="level-select"]').forEach((item) => {
      item.addEventListener("click", () => {
        this.saveLvMul();
      });
    });
    // 绑定保存等级的事件
    document.querySelectorAll("#level-number, #level-min").forEach((item) => {
      item.addEventListener("change", () => {
        this.saveLvMin(item.value);
      });
    });
    document.querySelectorAll("#level-max").forEach((item) => {
      item.addEventListener("change", () => {
        this.saveLvMax(item.value);
      });
    });
  },
};
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
        border: 3px solid #319df8;
        text-align: center;
        &:focus {
          border-color: #2b2ea3;
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
  }
}
</style>
