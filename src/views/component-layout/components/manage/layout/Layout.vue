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
              <div class="item" v-for="(classlib,index_item) in li.children" :key="'index_item'+index_item">
                
                <div class="classlib-title">{{classlib.title}}</div>

                  <!-- flex同步的class -->
                  <div class="classlib-item-relations">
                    <div class="relations-item" v-for="(relation_cate,index_relation) in classlib.children" :key="index_relation">
                      <div class="title"> {{ relation_cate.title }} </div>
                      <div class="relation-cate">
                        <div class="cate-title"></div>
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
      attrsStr: "",
      visible: false,
      // 当有子元素为一字符串的时候
      childStrs: [],
      //通过勾选的方式编辑class
      commonClass: [
        {
          title: "flex布局",
          children: [
            {
              title: "flex",
              class: "flex",
              type: "class-lib-row",
              //作为被选中后才会生效的css类
              children: [
                {
                  title: "主轴方向",
                  type: "row-cate",
                  //操作方式 select:单选
                  control: "select",
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
    attrsStr(newValue, oldValue) {}
  },
  created() {},
  methods: {
    show() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.main.focus();
        this.classStr = this.activityRule.attrs
          ? this.activityRule.attrs.class
          : "";
      });
    },
    hide() {
      this.visible = false;
      this.$emit("close");
    },
    success() {
      this.hide();
    }
  }
};
</script>
<style lang="scss">
input.form-control {
  width: 100%;
}

.class-selecter{
  >.title{
    font-weight: bold;
  }
  // css包
  .classlib-item{
    >.title{
      color: green;
    }
    .class-list{


        .classlib-item-relations{
          >.title{
            color: grey;
          }
        }

    }
  }
}
</style>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
</style>