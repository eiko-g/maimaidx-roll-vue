<template>
  <div class="setting-block setting-category">
    <h3 class="title">分类选择</h3>
    <div class="cats">
      <label for="cat-all" class="cat-label all">
        <input
          @click="catClickAll"
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

<script>
export default {
  name: "Category",
};
</script>

<script setup>
import {useStore} from "vuex";
import {onMounted} from "vue";
const store = useStore();

let category = store.getters.getCat;
console.log("Get Category", category);

// 点击全选则取消其他选项
function catClickAll() {
  let elements = document.querySelectorAll("input.cat:not(.all)");
  elements.forEach((item) => (item.checked = false));
  document.querySelector("input.cat.all").checked = true;
}
// 点其他的取消勾选 All，全取消了就选上 All
function catClickOther() {
  document.querySelector("input.cat.all").checked = false;
  let other = document.querySelectorAll("input.cat:not(.all):checked");
  if (other.length === 0) {
    document.querySelector("input.cat.all").checked = true;
  }
}

// 勾选分类
function checkCat(cat) {
    return category.includes(cat);
}

// 保存难度设置
function saveCat() {
  let elements = document.querySelectorAll("input.cat:checked"),
      cat = [];
  elements.forEach((item) => {
    console.log(item.value);
    cat.push(item.value);
  });
  store.commit("saveCat", cat);
  category = cat;
}

onMounted(()=>{
  // 给非 All 分类注册事件
  document.querySelectorAll("input.cat:not(.all)").forEach((item) => {
    item.addEventListener("click", () => {
      catClickOther();
    });
  });
  // 给所有分类注册事件
  document.querySelectorAll("input.cat").forEach((item) => {
    // 点击就保存
    item.addEventListener("change", () => {
      saveCat();
      console.log("Save cat", category);
    });
    // 打开页面时检查已勾选的分类
    item.checked = checkCat(item.value);
  });
});
</script>

<style lang="scss" scoped>
@import "../../source/scss/mixin";

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

    input:checked ~ .inner {
      color: #fff;
    }

    &.all {
      color: #666;
      input:checked ~ .inner {
        color: #fb6099;
        border-color: #fb6099;
      }
    }
    &.pops_anime {
      color: #ff972a;
      input:checked ~ .inner {
        border-color: #ff972a;
        background-color: #ffc98f;

        @include txsh(#ff972a);
      }
    }
    &.niconico {
      color: #09c8d4;
      input:checked ~ .inner {
        border-color: #09c8d4;
        background-color: #85e6ed;
        @include txsh(#09c8d4);
      }
    }
    &.toho {
      color: #ad59ee;
      input:checked ~ .inner {
        border-color: #ad59ee;
        background-color: #d4a2fa;
        @include txsh(#ad59ee);
      }
    }
    &.variety {
      color: #42de6a;
      input:checked ~ .inner {
        border-color: #42de6a;
        background-color: #9bf2b1;
        @include txsh(#42de6a);
      }
    }
    &.maimai {
      color: #f74949;
      input:checked ~ .inner {
        border-color: #f74949;
        background-color: #fc9d9d;
        @include txsh(#f74949);
      }
    }
    &.gekichu {
      color: #3585fe;
      input:checked ~ .inner {
        border-color: #3585fe;
        background-color: #94bfff;
        @include txsh(#3585fe);
      }
    }
  }
}
</style>