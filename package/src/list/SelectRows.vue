<template>
  <div class="mulo-select-row">
    <!-- 选择列表 -->
    <list-default
      ref="list_default"
      :params="moreParams"
      :render-list="renderData"
      :api="api"
      :rows="rowsData"
      :filter="filter"
      :params-update-reload="paramsUpdateReload"
    >
      <!-- 列表渲染 -->
      <template v-slot:item="{item,index}">
        <td class="check-row">
          <input
            type="checkbox"
            @change="itemChange(item,$event)"
            v-model="item.selectRows_isSelected"
          />
        </td>
        <slot name="item" :item="item" :index="index">
          <td>未渲染列表</td>
        </slot>
      </template>
    </list-default>

    <div class="footer-btns">
      <div class="operation">
        <input v-model="onlyShowSelected" type="checkbox" />
        <label @click="onlyShowSelected=!onlyShowSelected">只显示已选择的</label>
      </div>
      <button @click="cancel" class="btn btn-danger">取消</button>
      <button @click="selectSuccess" class="btn btn-success">确认</button>
    </div>

    <!--  -->
  </div>
</template>

<script>
import ListDefault from "./Default";
import { ListDefualtMixin } from "./../../mixins/ListMixin";

export default {
  name: "select-rows",
  mixins: [ListDefualtMixin],
  components: {
    "list-default": ListDefault
  },
  computed: {
    rowsData() {
      let before = ["选择"];
      return before.concat(this.rows);
    }
  },
  watch: {
    selecteds(newValue, oldValue) {
      console.log("watch selecteds");
      this.selectedsData = this.selecteds;
    },
    onlyShowSelected(newValue, oldValue) {
      this.reLoadList(true);
    }
  },

  props: {
    //当参数改变时 自动重新加载列表
    paramsUpdateReload: {
      type: Boolean,
      default: false
    },

    // 刷新标识 * 计划用于操作后刷新列表,暂时没用
    refreshTag: {
      type: Number
    },

    // 已选中的项目 初始化或者更新
    selecteds: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 选择的主键
    listIdKey: {
      type: String,
      default: "id"
    }
  },
  created() {
    this.selectedsData = this.selecteds;
  },
  data() {
    return {
      //已选中的项目 = this.selecteds
      selectedsData: [],
      // 只显示已选择的内容
      onlyShowSelected: false,
      // 接口请求参数
      moreParams: {
        onlyShowSelected: false
      }
    };
  },
  methods: {
    //数据渲染前处理数据
    renderData(list) {
      //是否选中
      list.forEach((li, index) => {
        list[index].selectRows_isSelected = false;
        this.selectedsData.forEach((selectId, index2) => {
          if (selectId == li[this.listIdKey]) {
            list[index].selectRows_isSelected = true;
          }
        });
      });
      console.log(list, this.selectedsData);
      return list;
    },
    selectSuccess() {
      // 获取选中的ids
      // this.$nextTick(() => {
      //   this.$refs.list_default.loadLostData(true, {}, () => {});
      // });
      // 编辑成功
      this.$emit("success", {
        selecteds: this.selectedsData
      });
    },
    //取消选择
    cancel() {
      this.$emit("cancel", {
        selecteds: this.selectedsData
      });
    },

    /**
     * 勾选的时候,选择列表中的
     *
     */
    itemChange(item, e) {
      console.log(item, e);
      //更新已选择列表
      let idKey = item[this.listIdKey];
      let inArrIndex = this.inArray(idKey, this.selectedsData);
      if (inArrIndex !== false) {
        //
        this.selectedsData.splice(inArrIndex, 1);
      } else {
        this.selectedsData.push(idKey);
      }
    },
    /**
     * 重新加载列表
     */
    reLoadList(reset) {
      //更新请求参数
      this.moreParams = {
        onlyShowSelected: this.onlyShowSelected ? 1 : 0,
        selecteds: this.selectedsData
      };
      //加载列表
      this.$nextTick(() => {
        this.$refs.list_default.loadList(reset);
      });
    },

    /**
     * id是否在数组中
     *
     * @return index | false
     */
    inArray(serach, arr) {
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (serach == element) {
          return index;
        }
      }
      return false;
    }
  }
};
</script>

<style lang="scss" >
.mulo-select-row {
  .footer-btns {
    text-align: right;
  }
}
</style>