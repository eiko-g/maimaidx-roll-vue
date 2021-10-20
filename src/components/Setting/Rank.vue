<template>
  <div class="setting-block setting-rank">
    <h3 class="title">难度设置</h3>
    <div class="ranks">
      <label class="rank-label all" for="rank-all">
        <input
          @click="rankClickAll"
          type="checkbox"
          name="rank"
          value="all"
          id="rank-all"
          class="rank all"
        />
        <div class="inner">All</div>
      </label>

      <label class="rank-label B" for="rank-B">
        <input
          type="checkbox"
          name="rank"
          value="B"
          id="rank-B"
          class="rank B"
        />
        <div class="inner">B</div>
      </label>

      <label class="rank-label A" for="rank-A">
        <input
          type="checkbox"
          name="rank"
          value="A"
          id="rank-A"
          class="rank A"
        />
        <div class="inner">A</div>
      </label>

      <label class="rank-label E" for="rank-E">
        <input
          type="checkbox"
          name="rank"
          value="E"
          id="rank-E"
          class="rank E"
        />
        <div class="inner">E</div>
      </label>

      <label class="rank-label M" for="rank-M">
        <input
          type="checkbox"
          name="rank"
          value="M"
          id="rank-M"
          class="rank M"
        />
        <div class="inner">M</div>
      </label>

      <label class="rank-label R" for="rank-R">
        <input
          type="checkbox"
          name="rank"
          value="R"
          id="rank-R"
          class="rank R"
        />
        <div class="inner">R</div>
      </label>
    </div>
    <p class="tips">点击选择需要抽选的难度，可以多选。</p>
  </div>
</template>

<script>
export default {
  name: "Rank",
  data() {
    return {
      rank: [],
    };
  },
  methods: {
    // 点击全选则取消其他选项
    rankClickAll() {
      let elements = document.querySelectorAll("input.rank:not(.all)");
      elements.forEach((item) => (item.checked = false));
      document.querySelector("input.rank.all").checked = true;
    },
    // 点其他的取消勾选 All，全取消了就选上 All
    rankClickOther() {
      document.querySelector("input.rank.all").checked = false;
      let other = document.querySelectorAll("input.rank:not(.all):checked");
      if (other.length === 0) {
        document.querySelector("input.rank.all").checked = true;
      }
    },

    /**
     * 载入后获取数据系列
     */
    // 获取难度
    getRank() {
      this.rank = this.$store.getters.getRank;
      console.log("Get Rank", this.rank);
    },

    /**
     * 检查各种设置
     */
    // 检查难度
    checkRank(rank) {
      if (this.rank.length == 0) {
        if (rank === "all") {
          return true;
        }
      } else {
        return this.rank.includes(rank);
      }
    },

    /**
     * 保存动作
     */
    // 保存难度设置
    saveRank() {
      let elements = document.querySelectorAll("input.rank:checked"),
        rank = [];
      elements.forEach((item) => {
        console.log(item.value);
        rank.push(item.value);
      });
      this.$store.commit("saveRank", rank);
      this.rank = rank;
    },
  },
  created() {
    this.getRank();
  },
  mounted() {
    // 给非 All 难度注册事件
    document.querySelectorAll("input.rank:not(.all)").forEach((item) => {
      item.addEventListener("click", () => {
        this.rankClickOther();
      });
    });
    // 给所有难度注册事件
    document.querySelectorAll("input.rank").forEach((item) => {
      // 点击就保存
      item.addEventListener("change", () => {
        this.saveRank();
        console.log("Save Rank", this.rank);
      });
      // 打开页面时检查已勾选的难度
      item.checked = this.checkRank(item.value);
    });
  },
};
</script>

<style lang="scss" scoped>
.ranks {
  display: flex;
  .rank-label {
    user-select: none;
    width: calc(1 / 6 * 100%);
    text-align: center;
    margin: 5px;
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
      input:checked ~ .inner {
        border-color: #ccc;
        background-color: #ccc;
      }
    }
    &.B {
      .inner {
        border-color: var(--color-B);
      }
      input:checked ~ .inner {
        background-color: var(--color-B);
      }
    }
    &.A {
      .inner {
        border-color: var(--color-A);
      }
      input:checked ~ .inner {
        background-color: var(--color-A);
      }
    }
    &.E {
      .inner {
        border-color: var(--color-E);
      }
      input:checked ~ .inner {
        background-color: var(--color-E);
      }
    }
    &.M {
      .inner {
        border-color: var(--color-M);
      }
      input:checked ~ .inner {
        background-color: var(--color-M);
      }
    }
    &.R {
      .inner {
        border-color: var(--color-R);
      }
      input:checked ~ .inner {
        background-color: var(--color-R);
      }
    }
  }
}
</style>