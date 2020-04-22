
<template>
  <div class="canvas" draggable="false" @drop="drop" @dragover="allowDrop">
    <div>sdfasdf</div>
    <render-rule v-model="rules"></render-rule>
  </div>
</template>

<script>
import RenderRule from "./RenderRule";
export default {
  name: "cl-canvas",
  components: {
    [RenderRule.name]: RenderRule
  },
  data() {
    return {
      rules: [
        {
          type: "ElButton",
          ref: "btn",
          children: ["test"]
        }
      ]
    };
  },
  methods: {
    // 拖动的组件落下
    drop(ev) {
      ev.preventDefault();
      var data = JSON.parse(ev.dataTransfer.getData("text/plain"));
      let { row } = data;

      //组件加入到容器
      this.rules.push({
        ...row
      });

      //   let element = document.createElement("div");
      //   element.innerHTML = "button";
      //   ev.target.appendChild(element);
    },
    //拖拽的进入这里 ??
    allowDrop(ev) {
      //   console.log(ev);
      ev.preventDefault();
    }
  }
};
</script>

<style lang="scss" >
.cl-container {
  min-height: 50px;
}
</style>