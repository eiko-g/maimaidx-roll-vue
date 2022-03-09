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

<script>
export default {
  name: "Rank",
};
</script>

<script setup>
import {useStore} from "vuex";
import {onMounted} from "vue";
const store = useStore();
let rank = store.getters.getRank;
console.log("Get Rank", rank);

// 点击全选则取消其他选项
function rankClickAll() {
  let elements = document.querySelectorAll("input.rank:not(.all)");
  elements.forEach((item) => (item.checked = false));
  document.querySelector("input.rank.all").checked = true;
}
// 点其他的取消勾选 All，全取消了就选上 All
function rankClickOther() {
  document.querySelector("input.rank.all").checked = false;
  let other = document.querySelectorAll("input.rank:not(.all):checked");
  if (other.length === 0) {
    document.querySelector("input.rank.all").checked = true;
  }
}

// 检查难度
function checkRank(inputRank) {
    return rank.includes(inputRank);
}
// 保存难度设置
function saveRank() {
  let elements = document.querySelectorAll("input.rank:checked"),
      tempRank = [];
  elements.forEach((item) => {
    console.log(item.value);
    tempRank.push(item.value);
  });
  store.commit("saveRank", tempRank);
  rank = tempRank;
}

onMounted(()=>{
  // 给非 All 难度注册事件
  document.querySelectorAll("input.rank:not(.all)").forEach((item) => {
    item.addEventListener("click", () => {
      rankClickOther();
    });
  });
  // 给所有难度注册事件
  document.querySelectorAll("input.rank").forEach((item) => {
    // 点击就保存
    item.addEventListener("change", () => {
      saveRank();
      console.log("Save Rank", rank);
    });
    // 打开页面时检查已勾选的难度
    item.checked = checkRank(item.value);
  });
});
</script>

<style lang="scss" scoped>
.ranks {
  display: flex;
  .rank-label {
    user-select: none;
    width: calc(1 / 6 * 100%);
    text-align: center;
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