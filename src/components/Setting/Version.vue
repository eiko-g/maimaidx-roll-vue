<template>
  <div class="setting-block setting-version">
    <h3 class="title">版本选择</h3>
    <div class="versions">
      <label for="version-all" class="version-label all">
        <input
          @click="verClickAll"
          type="checkbox"
          name="版本"
          id="version-all"
          value="all"
          class="version all"
        />
        <div class="inner">全部</div>
      </label>

      <label for="version-无印" class="version-label 无印">
        <input type="checkbox" name="版本" id="version-无印" value="无印" class="version" />
        <div class="inner">无印</div>
      </label>

      <label for="version-无印Plus" class="version-label 无印Plus">
        <input type="checkbox" name="版本" id="version-无印Plus" value="无印+" class="version" />
        <div class="inner">无印+</div>
      </label>

      <label for="version-绿" class="version-label 绿">
        <input type="checkbox" name="版本" id="version-绿" value="绿" class="version" />
        <div class="inner">绿</div>
      </label>

      <label for="version-绿Plus" class="version-label 绿Plus">
        <input type="checkbox" name="版本" id="version-绿Plus" value="绿+" class="version" />
        <div class="inner">绿+</div>
      </label>

      <label for="version-橙" class="version-label 橙">
        <input type="checkbox" name="版本" id="version-橙" value="橙" class="version" />
        <div class="inner">橙</div>
      </label>

      <label for="version-橙Plus" class="version-label 橙Plus">
        <input type="checkbox" name="版本" id="version-橙Plus" value="橙+" class="version" />
        <div class="inner">橙+</div>
      </label>

      <label for="version-粉" class="version-label 粉">
        <input type="checkbox" name="版本" id="version-粉" value="粉" class="version" />
        <div class="inner">粉</div>
      </label>

      <label for="version-粉Plus" class="version-label 粉Plus">
        <input type="checkbox" name="版本" id="version-粉Plus" value="粉+" class="version" />
        <div class="inner">粉+</div>
      </label>

      <label for="version-紫" class="version-label 紫">
        <input type="checkbox" name="版本" id="version-紫" value="紫" class="version" />
        <div class="inner">紫</div>
      </label>

      <label for="version-紫Plus" class="version-label 紫Plus">
        <input type="checkbox" name="版本" id="version-紫Plus" value="紫+" class="version" />
        <div class="inner">紫+</div>
      </label>

      <label for="version-奶" class="version-label 奶">
        <input type="checkbox" name="版本" id="version-奶" value="奶" class="version" />
        <div class="inner">奶</div>
      </label>

      <label for="version-奶Plus" class="version-label 奶Plus">
        <input type="checkbox" name="版本" id="version-奶Plus" value="奶+" class="version" />
        <div class="inner">奶+</div>
      </label>

      <label for="version-FiNALE" class="version-label FiNALE">
        <input type="checkbox" name="版本" id="version-FiNALE" value="FiNALE" class="version" />
        <div class="inner">FiNALE</div>
      </label>

      <label for="version-DX" class="version-label DX">
        <input type="checkbox" name="版本" id="version-DX" value="DX" class="version" />
        <div class="inner">DX</div>
      </label>

      <label for="version-DX2021" class="version-label DX2021">
        <input type="checkbox" name="版本" id="version-DX2021" value="DX2021" class="version" />
        <div class="inner">DX2021</div>
      </label>
    </div>
    <p class="tips">点击选择需要抽选的歌曲版本，可以多选。</p>
  </div>
</template>

<script>
export default {
  name: "Version",
  data() {
    return {
      version: [],
    };
  },
  methods: {
    // 点击全选则取消其他选项
    verClickAll() {
      let elements = document.querySelectorAll("input.version:not(.all)");
      elements.forEach((item) => (item.checked = false));
      document.querySelector("input.version.all").checked = true;
    },
    // 点其他的取消勾选 All，全取消了就选上 All
    verClickOther() {
      document.querySelector("input.version.all").checked = false;
      let other = document.querySelectorAll("input.version:not(.all):checked");
      if (other.length === 0) {
        document.querySelector("input.version.all").checked = true;
      }
    },

    /**
     * 载入后获取数据系列
     */
    // 获取分类
    getVer() {
      this.version = this.$store.getters.getVer;
      console.log("Get Version", this.version);
    },

    /**
     * 检查各种设置
     */
    // 检查难度
    checkVer(ver) {
      if (this.version.length == 0) {
        if (ver === "all") {
          return true;
        }
      } else {
        return this.version.includes(ver);
      }
    },

    /**
     * 保存动作
     */
    // 保存难度设置
    saveVer() {
      let elements = document.querySelectorAll("input.version:checked"),
        ver = [];
      elements.forEach((item) => {
        console.log(item.value);
        ver.push(item.value);
      });
      this.$store.commit("saveVer", ver);
      this.version = ver;
    },
  },
  created() {
    this.getVer();
  },
  mounted() {
    // 给非 All 版本注册事件
    document.querySelectorAll("input.version:not(.all)").forEach((item) => {
      item.addEventListener("click", () => {
        this.verClickOther();
      });
    });
    // 给所有版本注册事件
    document.querySelectorAll("input.version").forEach((item) => {
      // 点击就保存
      item.addEventListener("change", () => {
        this.saveVer();
        console.log("Save ver", this.version);
      });
      // 打开页面时检查已勾选的难度
      item.checked = this.checkVer(item.value);
    });
  },
};
</script>

<style lang="scss" scoped>
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
</style>