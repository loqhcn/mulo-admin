<template>
  <div ref="main">
    <div
      class="compoment-layout flex column"
      :class="{'container-border': setting.containerBorder}"
    >
      <div class="header flex space-between">
        <div class="left">
          <h3 @click="appRoute.go('/component-layout/index')">Component Layout</h3>
        </div>
        <div class="right">
          <el-button @click="buildTemplate">生成template</el-button>
          <el-button @click="showJson">打印JSON规则</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button @click="preview">预览</el-button>
        </div>
      </div>

      <div class="main flex space-between">
        <!-- 选择组件 -->
        <div class="left flex column center-line">
          <el-tabs v-model="leftTab">
            <el-tab-pane label="页面" name="pages">
              <el-tree :data="pagesData" :props="pagesTreeDefaultProps"></el-tree>
            </el-tab-pane>
            <el-tab-pane label="组件" name="components">
              <div class="components-select">
                <!-- 组件分类 -->
                <div class="cate" v-for="(row,pkgName) in components" :key="pkgName">
                  <div class="title">{{row.config.title || pkgName}}</div>

                  <!-- 组件栏目 -->
                  <div class="conponents">
                    <div
                      class="item"
                      v-for="(component,componentType) in row.components"
                      :key="componentType"
                    >
                      <div
                        class="row"
                        draggable="true"
                        @drag="drag(componentType,component,pkgName,$event)"
                        @dragstart="dragStart(componentType,component,pkgName,$event)"
                      >{{ component.title || componentType }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <!-- 编辑区 -->
        <div class="body edit-body" tabindex="1" @keydown.exact="keydown" @click="focusMain">
          <cl-canvas
            @focus-main="focusMain"
            ref="cl_canvas"
            :width="screenTypes[screenTypeActive].width"
            :height="screenTypes[screenTypeActive].height"
          ></cl-canvas>
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
            <div v-show="tabRightActive==0" class="item" ref="editor" style="padding:5px;"></div>

            <!-- 设置 -->
            <div v-show="tabRightActive==1" class="item">
              <el-form ref="setting" label-width="80px">
                <el-form-item label="容器边框">
                  <el-checkbox v-model="setting.containerBorder" />
                </el-form-item>
                <el-form-item label="容器边距">
                  <el-input style="width:100px" type="number" v-model="setting.containerPadding" />px
                </el-form-item>

                <el-form-item label="屏幕类型">
                  <el-select v-model="screenTypeActive" placeholder>
                    <el-option
                      v-for="(item,index) in screenTypes"
                      :key="index"
                      :label="item.type"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <!-- 结构 -->
            <div v-show="tabRightActive==2" class="item"></div>
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
  </div>
</template>

<script>
import Canvas from "./Canvas";
import Preview from "./preview/Preview";
import DefaultUi from "./ui/default";
import buildTemplate from "./compile/buildTemplate";

export default {
  components: {
    [Canvas.name]: Canvas,
    [Preview.name]: Preview,
  },
  data() {
    return {
      previewVisible: false,

      // components: DefaultUi,
      components: this.$clPackages,

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
        containerPadding: 0,
      },
      //内置屏幕类型
      screenTypes: [
        // 充满
        { type: "auto", width: "100%", height: "100%" },
        // 苹果6
        { type: "iphone6", width: "375px", height: "667px" },
      ],
      screenTypeActive: 1,
      //vuejson 整个编辑规则
      rules: [],

      tabRight: ["属性", "设置", "结构", "样式"],
      tabRightActive: 0,

      // 左侧栏目
      leftTab: "pages",
      //所属应用
      appId: 1,
      pagesData: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      pagesTreeDefaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {
    this.$control.main = this;
  },
  mounted() {
    this.focusMain();
  },
  methods: {
    /**
     * 聚焦div的事件
     *
     */
    focusMain() {
      document.querySelector(".edit-body").focus();
    },
    // 开始拖动
    dragStart(componentType, component, pkgName, e) {
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          // row: row,
          componentType: componentType,
          pkgName: pkgName,
        })
      );

      console.log(component, e);
    },
    // 拖动中
    drag(componentType, component, pkgName, e) {
      console.log("落下");
    },
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
    buildTemplate() {
      let rules = this.getRules();
      let dom = buildTemplate(rules);
      console.log("html", dom);
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
      if (e.code == "KeyL") {
        let selectEd = this.$control.getSelected();
        if (!selectEd) {
          this.$toast("先选择一个节点");
          return;
        }

        this.showLayout("cl_layout");
      }
      //T tree 组件树管理
      else if (e.code == "KeyT") {
        this.showLayout("cl_tree");
      } else if (e.code == "Delete") {
        let info = this.$control.getSelected();
        if (!info) {
          return;
        }
        let parent = this.$control.getParent(info);
        console.log(parent);
        if (parent) {
          parent.arr.splice(parent.index, 1);
          this.$control.$forceUpdate();
        }
      }
      console.log(e);
    },
    //显示管理弹出层
    showLayout(ref) {
      this.$nextTick(() => {
        return this.$refs.cl_canvas.$refs[ref].show();
      });
    },
  },
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
    }
  }

  .right {
    min-width: 200px;
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
    .panel-body {
      padding: 0 5px;
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