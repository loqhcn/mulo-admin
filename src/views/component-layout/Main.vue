<template>
  <div class="compoment-layout flex column" :class="{'container-border': setting.containerBorder}">
    <div class="header">
      <h3>设计器</h3>
    </div>

    <div class="main flex space-between">
      <div class="left flex column center-line">
        <div class="components-select">
          <!-- 组件分类 -->
          <div class="cate" v-for="(li,index) in components" :key="index">
            <div class="title">{{li.title}}</div>
            <div class="conponents">
              <div class="item" v-for="(row,index2) in li.children" :key="index2">
                <!-- 组件栏目 -->
                <div
                  class="row"
                  draggable="true"
                  @drag="drag(row,$event)"
                  @dragstart="dragStart(row,$event)"
                >{{row.title}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 编辑区 -->
      <div class="body">
        <cl-canvas></cl-canvas>
      </div>
      <div class="right">
        <!-- 右侧导航 -->
        <div class="panel-menu flex space-between">
          <div
            class="item"
            v-for="(li,index) in tabRight"
            :key="index"
            :class="{active:index==tabRightActive}"
            @click="tabRightActive=index"
          >{{li}}</div>
        </div>
        <div class="panel-body">
          <!-- 组件属性 -->
          <div v-if="tabRightActive==0" class="item"></div>

          <!-- 设置 -->
          <div v-if="tabRightActive==1" class="item">
            <div class="row">
              <label class="title">容器边框</label>
              <input type="checkbox" v-model="setting.containerBorder" />
            </div>

            <div class="row">
              <label class="title">容器padding</label>
              <input type="number" v-model="setting.containerPadding" />px
            </div>

            <div class="row">
              <label class="title">屏幕类型</label>
              <select v-model="screenTypeActive">
                <option v-for="(li,index) in screenTypes" :key="index" :value="index">{{li.type}}</option>
              </select>
            </div>
          </div>

          <!-- 结构 -->
          <div v-if="tabRightActive==2" class="item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Canvas from "./Canvas";

export default {
  components: {
    [Canvas.name]: Canvas
  },
  data() {
    return {
      components: [
        {
          title: "基础",
          children: [
            {
              type: "button",
              title: "Button",
              icon: "",
              attrs: {
                class: "btn"
              },
              children: ["Button"]
            }
          ]
        },
        {
          title: "布局",
          children: [
            {
              type: "div",
              attrs: {
                class: "cl-container"
              },
              title: "Div容器",
              icon: "",
              containerSetting: {
                // 1代表这是一个容器类型
                status: 1,
                type: "cl-container"
              }
            }
          ]
        },
        {
          title: "bootstrap栅格布局",
          children: [
            {
              type: "div",
              title: "Div.container",
              class: ["container"],
              icon: ""
            },
            {
              type: "div",
              title: "Div.row",
              class: ["col"],
              icon: ""
            },
            {
              type: "div",
              title: "Div.col",
              icon: ""
            }
          ]
        }
      ],

      /**
       * 编辑区全局设置
       *
       */
      setting: {
        //容器边框显示
        containerBorder: true,
        //容器内边距
        containerPadding: 0
      },
      screenTypes: [
        { type: "auto" },
        { type: "iphone6", width: 375, height: 667 }
      ],
      screenTypeActive: 0,
      //vuejson 整个编辑规则
      rules: [],

      tabRight: ["属性", "设置", "结构"],
      tabRightActive: 0
    };
  },
  methods: {
    // 开始拖动
    dragStart(row, e) {
  
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          row: row
        })
      );

      console.log(row, e);
    },
    // 拖动中
    drag(row, e) {}
  }
};
</script>

<style lang="scss" >
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

  // 基础容器
  .cl-container {
    padding: 5px;
  }

  // 容器边框
  &.container-border {
    .cl-container {
      border: 1px solid #999;
    }
  }
}
.main {
  height: 100%;

  // 组件选择
  > .left {
    min-width: 100px;
    border-right: 1px solid #000;

    .components-select {
      padding: 15px;
      .cate {
        .title {
          color: #999;
          font-weight: bold;
        }

        .conponents {
          .item {
            .row {
              width: 50px;
              height: 50px;
            }
          }
        }
      }
    }
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