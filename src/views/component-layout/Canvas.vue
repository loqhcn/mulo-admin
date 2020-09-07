
<template>
  <div class="canvas" draggable="false" @drop="drop" @dragover="allowDrop">
    <render-rule
      @change="change"
      @input="input"
      @select-component="selectComponent"
      v-model="rules"
    ></render-rule>

    <!-- 弹出层 编辑 -->
    <cl-layout ref="cl_layout" @close="focusMain"></cl-layout>
    <cl-tree v-model="rules" ref="cl_tree" @close="focusMain"></cl-tree>
  </div>
</template>

<script>
import RenderRule from "./rule/Render";
import Layout from "./components/manage/layout/Layout.vue";
import Tree from "./components/manage/tree/Tree.vue";

export default {
  name: "cl-canvas",
  components: {
    [RenderRule.name]: RenderRule,
    //操控弹出层
    [Layout.name]: Layout,
    [Tree.name]: Tree,
  },
  data() {
    return {
      rules: [],
      //可视化id
      viewId: 1,
      //刷新标记
      flushTag: 0,
    };
  },
  watch: {
    rules: {
      handler(newdata, olddata) {
        console.log("canvas watch rules update");
      },
      deep: true,
    },
  },
  created() {
    this.$control.canvas = this;
    let view = this.$views[this.viewId];
    if (view) {
      this.rules = view;
    }
  },
  methods: {
    selectComponent() {},
    focusMain() {
      this.$emit("focus-main");
    },
    change(e) {
      console.log("change", e);
    },
    viewToServer() {
      //更新view到socket服务
      if (!this.viewId) {
        console.log("无viewId");
        return;
      }
      //提交到服务器
      this.$socket.emit("view", {
        viewId: this.viewId,
        data: this.rules,
      });
    },
    /**
     * 当 rules被更新, 规则同步到服务器
     *
     */
    input(e) {
      this.viewToServer();
      this.$set(this.$data, "flushTag", this.flushTag + 1);
    },
    // 拖动的组件落下
    drop(ev) {
      ev.preventDefault();
      var data = JSON.parse(ev.dataTransfer.getData("text/plain"));
      let {
        componentType,
        pkgName,
        //覆盖进入实例的data中
      } = data;

      //组件加入到容器
      this.rules.push({
        type: componentType,
        pkgName: pkgName,
      });

      //刷新
      this.viewToServer();

      //   let element = document.createElement("div");
      //   element.innerHTML = "button";
      //   ev.target.appendChild(element);
    },
    //拖拽的进入这里 ??
    allowDrop(ev) {
      //   console.log(ev);
      ev.preventDefault();
    },
  },
};
</script>

<style lang="scss" >
.cl-container {
  min-height: 50px;
}
</style>