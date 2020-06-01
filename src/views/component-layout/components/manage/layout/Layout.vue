<template>
  <div
    v-if="visible"
    tabindex="0"
    ref="main"
    @keydown.enter.exact="hide"
    @click.stop.prevent
    @keydown.stop
    class="shadow"
  >
    <div class="eidt-layer">
      <h1>Layout Manage</h1>

      <div>
        <span>class:</span>
        <input class="form-control" type="text" v-model="classStr" />
      </div>

      <div class="class-selecter">
        <span class="title">css类选择:</span>
        <div class="classlib-item" v-for="(li,index) in commonClass" :key="index">
          <div class="title">{{li.title}}</div>
          <div class="class-list flex wrap">
            <!-- ClassLib.children -->
            <div
              class="item"
              v-for="(classlib,index_item) in li.children"
              :key="'index_item'+index_item"
              :class="{active:isSelectCateClass(classlib.class,classlib.field)}"
            >
              <div
                class="classlib-title"
                @click="selectCateClass(classlib.class,classlib.field)"
              >{{classlib.title}}</div>

              <!-- flex同步的class -->
              <div class="classlib-item-relations" v-if="opClassList[classlib.field]">
                <div
                  class="relations-item"
                  v-for="(relation_cate,index_relation) in classlib.children"
                  :key="index_relation"
                >
                  <!-- ClassCate -->
                  <div class="class-item-cates">
                    <div class="title">{{ relation_cate.title }}</div>
                    <div class="relation-cate flex">
                      <div
                        v-for="(cate_item,index_cate_item) in relation_cate.children"
                        :key="'index_cate_item'+index_cate_item"
                        @click.stop="selectCateClass(cate_item.class,relation_cate.field)"
                        class="item"
                        :class="{active:isSelectCateClass(cate_item.class,relation_cate.field)}"
                      >{{ cate_item.title }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span>属性设置:</span>
        <textarea v-model="attrsStr" class="form-control" name="attrs"></textarea>
      </div>

      <div class="flex">
        <button @click="success">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cl-layout",
  data() {
    return {
      classStr: "",

      //用于操作的class列表 , 最终结果注入到class内
      opClassList: {},
      attrsStr: "",
      visible: false,
      // 当有子元素为一字符串的时候
      childStrs: [],
      //通过勾选的方式编辑class
      commonClass: [
        //ClassLib
        {
          title: "flex布局",
          children: [
            {
              title: "flex",
              class: "flex",
              field: "flex",
              type: "class-lib-row",
              //作为被选中后才会生效的css类
              children: [
                {
                  title: "主轴方向",
                  type: "row-cate",
                  //操作方式 select:单选
                  control: "select",
                  field: "flex_layout_direction",
                  children: [
                    {
                      title: "row",
                      class: "row"
                    },
                    {
                      title: "row-reverse",
                      class: "row-reverse"
                    },
                    {
                      title: "column",
                      class: "column"
                    },
                    {
                      title: "column-reverse",
                      class: "column-reverse"
                    }
                  ]
                },
                {
                  title: "超出方式",
                  type: "row-cate",
                  control: "select",
                  field: "flex_layout_wrap",
                  children: [
                    {
                      title: "nowrap",
                      class: "nowrap"
                    },
                    {
                      title: "wrap",
                      class: "wrap"
                    }
                  ]
                },
                {
                  title: "主轴上面的对其方式",
                  type: "row-cate",
                  control: "select",
                  field: "flex_layout_main",
                  children: [
                    {
                      title: "start",
                      class: "start"
                    },
                    {
                      title: "center",
                      class: "center"
                    },
                    {
                      title: "end",
                      class: "end"
                    },
                    {
                      title: "space-between",
                      class: "space-between"
                    },
                    {
                      title: "space-around",
                      class: "space-around"
                    }
                  ]
                },
                {
                  title: "交叉轴对其方式",
                  type: "row-cate",
                  control: "select",
                  field: "flex_layout_item",
                  children: [
                    {
                      title: "start-item",
                      class: "start-item"
                    },
                    {
                      title: "end-item",
                      class: "end-item"
                    },
                    {
                      title: "center-item",
                      class: "center-item"
                    },
                    {
                      title: "baseline-item",
                      class: "baseline-item"
                    },
                    {
                      title: "stretch-item",
                      class: "stretch-item"
                    }
                  ]
                },
                {
                  title: "多线轴对其方式",
                  type: "row-cate",
                  control: "select",
                  field: "flex_layout_content",
                  children: [
                    {
                      title: "start-content",
                      class: "start-content"
                    },
                    {
                      title: "end-content",
                      class: "end-content"
                    },
                    {
                      title: "center-content",
                      class: "center-content"
                    },
                    {
                      title: "space-between-content",
                      class: "space-between-content"
                    },
                    {
                      title: "space-around-content",
                      class: "space-around-content"
                    },
                    {
                      title: "stretch-content",
                      class: "stretch-content"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    activityRule() {
      return this.$control.getSelected();
    }
  },
  beforeDestroy() {
    // this.$control.render.$forceUpdate();
  },
  watch: {
    /**
     * 刷新rules的规则
     *
     */
    classStr(newValue, oldValue) {
      this.activityRule.attrs = Object.assign(this.activityRule.attrs || {}, {
        class: newValue
      });
      this.$control.canvas.viewToServer();
    },
    attrsStr(newValue, oldValue) {},
    opClassList: {
      deep: true,
      handler(newValue, oldValue) {
        console.log("opClass", newValue, this);
        this.activityRule.opClassList = newValue;
        this.$control.canvas.viewToServer();
      }
    }
  },
  created() {
    
  },
  methods: {
    show() {
      this.visible = true;
      this.$nextTick(() => {
        //classStr
        this.$refs.main.focus();
        this.classStr = this.activityRule.attrs
          ? this.activityRule.attrs.class
          : "";
        //class select
        this.opClassList = this.activityRule.opClassList || {};
      });
    },
    hide() {
      this.visible = false;
      this.$emit("close");
    },
    success() {
      this.hide();
    },

    // # class设置

    //当前节点是否有class
    hasClass(className) {},
    /**
     * 选中一个class
     *
     */
    selectCateClass(className, field) {
      if (this.opClassList[field] && this.opClassList[field] == className) {
        this.$set(this.opClassList, field, undefined);
        return;
      }
      this.$set(this.opClassList, field, className);
      // this.opClassList[field] = cate_item.class;
    },
    // 是否选中了class
    isSelectCateClass(className, field) {
      return className == this.opClassList[field];
    }
  }
};
</script>
<style lang="scss">
input.form-control {
  width: 100%;
}

//样式选择器 , 注释中的名称定义在 class.d.ts
.class-selecter {
  > .title {
    font-weight: bold;
  }
  //ClassLib
  .classlib-item {
    > .title {
      color: green;
    }

    .class-list {
      //ClassLib.children
      > .item {
        &.active {
          .classlib-title {
            color: red;
          }
        }

        //ClassInfoRelations
        .classlib-item-relations {
          > .title {
            color: grey;
          }

          .relations-item {
            // 一份class分类下的class列表
            .class-item-cates {
              .relation-cate {
                //单个class选择
                > .item {
                  &.active {
                    color: red;
                  }
                  padding: 0 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
</style>