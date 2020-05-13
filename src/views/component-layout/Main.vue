<template>
  <div ref="main">
    <div
      class="compoment-layout flex column"
      :class="{'container-border': setting.containerBorder}"
    >
      <div class="header flex space-between">
        <div class="left">
          <h3>设计器</h3>
        </div>
        <div class="right">
          <el-button @click="buildTemplate">生成template</el-button>

          <el-button @click="showJson">打印JSON规则</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button @click="preview">预览</el-button>
        </div>
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
        <div class="body edit-body" tabindex="1" 
          
          @keydown.exact="keydown"
          
          
          @click="focusMain"
         >
          <cl-canvas ref="cl_canvas"></cl-canvas>
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
            <div v-if="tabRightActive==0" class="item" style="padding:5px;">
              <form-create
                v-model="attributeData"
                :rules="attributeRules"
                :footer-setting="{
                  visible:false,
                }"
              ></form-create>
            </div>

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
    <!-- 弹出层 预览 -->
    <div v-if="previewVisible" class="shadow">
      <div class="preview-box">
        <div class="preview-header flex row-reverse">
          <i @click="previewVisible=false" style="font-size:24px" class="el-icon-close"></i>
        </div>
        <div class="body">
          <preview :rules="rules"></preview>
        </div>
      </div>
    </div>

    <!-- 弹出层 编辑 -->
    <cl-layout ref="cl_layout" @close="focusMain"></cl-layout>
    <cl-tree ref="cl_tree" @close="focusMain"></cl-tree>

  </div>
</template>

<script>
import Canvas from "./Canvas";
import Preview from "./Preview";

import DefaultUi from "./ui/default";

import Layout from  './components/manage/layout/Layout.vue'
import Tree from  './components/manage/tree/Tree.vue'

import buildTemplate from './core/buildTemplate'

export default {
  components: {
    [Canvas.name]: Canvas,
    [Preview.name]: Preview,
    //cl-layout
    [Layout.name]: Layout,
    [Tree.name]: Tree,

  },
  data() {
    return {
      previewVisible: false,

      components: DefaultUi,

      /**
       * 属性编辑数据渲染
       *
       */
      attributeData: {},
      attributeRules: [],

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

      tabRight: ["属性", "设置", "结构", "样式"],
      tabRightActive: 0
    };
  },
  created() {},
  methods: {
    /**
     * 聚焦div的事件
     *
     */
    focusMain() {
      document.querySelector('.edit-body').focus();
    },
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
    drag(row, e) {},
    clear() {
      if (!confirm("确定?")) {
        return;
      }
      this.$refs.cl_canvas.rules = [];
    },
    /**
     * 获得rules
     * 
     */
    getRules() {
      return this.$refs.cl_canvas.rules;
    },
    /**
     * 编译模板
     * 
     * 
     */
    buildTemplate(){
      let rules = this.getRules();
      let dom =  buildTemplate( rules );
      console.log('html',dom);
    },
    preview() {
      this.$nextTick(() => {
        this.rules = this.$refs.cl_canvas.rules;
        this.previewVisible = true;
      });
    },
    showJson() {
      console.log(this.$refs.cl_canvas.rules);
    },

    /**
     * 键盘事件处理
     * @todo 快捷键处理
     * 
     */
    keydown(e) {
      // L layout 布局控制器
      if(e.code=='KeyL'){
        this.$refs.cl_layout.show();
      }
      //T tree 组件树管理
      else if(e.code=="keyT"){
        this.$refs.cl_tree.show();
      }
      console.log(e);
    }

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

  // 容器边框
  &.container-border {
    .cl-container {
      border: 1px solid #999;
      padding: 5px;
    }
  }
}

.main {
  height: 100%;

  // 组件选择
  > .left {
    min-width: 150px;
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
    width: 200px;
    overflow-x: hidden;
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

// 弹出层
.shadow {
  position: fixed;
  z-index: 200;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.preview-box {
  position: fixed;
  z-index: 200;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 1);
}
</style>