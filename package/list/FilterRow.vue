<template>
  <div class="mulo-filters">
    <!-- 筛选 -->
    <div class="filter-rows">
      <!-- 搜索 -->
      <div v-if="rulesData.search.visible" class="item">
        <el-input
          v-model="rulesModel['search']"
          class="search-row"
          :placeholder="rulesData.search.placeholder"
        ></el-input>
      </div>

      <!-- 筛选栏目 -->
      <template v-for="(li,index) in rulesData.filters">
        <!-- 输入框搜索 -->
        <template v-if="li.type=='input'">
          <div :key="index">
            <div class="item">
              <div v-if="li.title" class="field-name">{{li.title}}</div>
              <el-input v-model="rulesModel[ li.field ]" class="search-row" :placeholder="li.attr.placeholder || '请输入'+(li.title || li.field)"></el-input>
            </div>
          </div>
        </template>
      </template>

      <!-- 提交操作 -->
      <div class="item">
        <el-button @click="submit">搜索</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Button } from "element-ui";

export default {
  name: "mulo-filter-row",
  components: {
    [Input.name]: Input,
    [Button.name]: Button
  },
  computed: {
    //是否显示搜索按钮
    visibleSearchBtn() {
      return true;
    }
  },
  props: {
    rules: {
      default: () => {
        return {
          search: true,
          searchTitle: "商品名/ID",

          // 筛选框详细配置
          list: [
            {
              // select
              type: "select",

              // 字段
              name: "state",
              title: "广告状态",
              values: { "-1": "不限", "1": "正常", "2": "禁用" }

              //
            }
          ]
          //
        };
      }
    }
  },
  created() {
    //解析rules数据
  },
  data() {
    return {
      //规则数据
      rulesData: {
        // 搜索框
        search: {
          visible: true,
          field: "search",
          placeholder: "搜索关键字"
        },
        //筛选字段
        filters: [
          // 输入框筛选
          // {
          //   visible: true,
          //   type: "input",
          //   attr: {
          //     type: "number"
          //   },
          //   field: "name",
          //   title: "名称"
          // },
          // select框筛选
          {
            visible: true,
            type: "select",
            field: "status",
            title: "名称",
            selects: [
              { key: 0, val: "下架" },
              { key: 1, val: "正常" }
            ]
          }
          //  radio框
        ]
      },
      rulesModel: {
        search: "",
        status: 0,
      }
    };
  },
  methods: {
    submit() {
      console.log(this.rulesModel)
      this.$emit("filter", {
        data:this.rulesModel
      });
    },
    //读取输入的数据
    parseFilterData() {}
  }
};
</script>

<style lang="scss" scoped>
$spaceDefault:10px;

.filter-rows {
  padding: $spaceDefault 0;
  display: flex;
  flex-wrap: wrap;
  .item {
    .field-name {
      padding-right: $spaceDefault/2;
    }

    display: flex;
    align-items: center;
    padding-right: $spaceDefault;
  }
}
.search-row {
  width: 150px;
}
</style>