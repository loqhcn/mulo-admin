<template>
  <div class="compoment-layout flex column">
    <div class="header">
      <h3>设计器</h3>
    </div>
    <div class="main flex space-between">
      <div class="left flex column center-line">
        <div class="components-select">
          <!-- 组件分类 -->
          <div class="cate" v-for="(li,index) in components" :key="index">
            <div class="title"></div>
            <div class="conponents">
              <div class="item" v-for="(row,index2) in li.children" :key="index2">
                <!-- 组件栏目 -->
                <div class="row" draggable="true" @drag="drag">{{row.title}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 编辑区 -->
      <div class="body">
        <div class="canvas" draggable="true" @drop="drop" @dragover="allowDrop"></div>
      </div>
      <div class="right">
        <div class="panel-menu flex space-between">
          <div class="item">组件</div>
          <div class="item">设置</div>
          <div class="item">结构</div>
        </div>
        <div class="panel-body"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      components: [
        {
          title: "基础",
          children: [
            {
              type: "button",
              title: "Button",
              icon: ""
            }
          ]
        },
        {
          title: "基础",
          children: []
        }
      ],

      //vuejson
      rule: []
    };
  },
  methods: {
    drag(e) {
      // console.log(e);
    },
    // 接收的容器
    drop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("Text");
      let element = document.createElement("div");
      element.innerHTML = "button";
      console.log(element);
      ev.target.appendChild(element);
    },
    //拖拽的进入这里 ?? 
    allowDrop(ev) {
      ev.preventDefault();
    }
  }
};
</script>

<style lang="scss" scoped>
.compoment-layout,
.compoment-layout * {
  box-sizing: border-box;
}
.compoment-layout {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .header {
    min-height: 30px;
  }
}
.main {
  height: 100%;

  // 组件选择
  .left {
    min-width: 100px;
    border-right: 1px solid #000;
  }

  // 画布主体
  .body {
    width: 100%;
    background-color: #999;
    padding: 15px;
    height: 100%;
    overflow-y: scroll;

    .canvas {
      background-color: white;

      min-width: 100px;
      min-height: 100px;
    }
  }

  .right {
    min-width: 150px;
    border-left: 1px solid #000;
    // 菜单
    .panel-menu {
      width: 100%;
      .item {
        list-style-type: none;
        word-break: keep-all;
        padding: 0 5px;
      }
      .item.active {
        color: red;
      }
    }
  }
}
</style>