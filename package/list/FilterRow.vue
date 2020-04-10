<template>
  <div class="mulo-filters">
    <!-- 筛选 -->
    <div class="filter-rows">
      <!-- 搜索 -->
      <div v-if="rulesData.search.visible" class="item">
        <div v-if="rulesData.search.title" class="field-name">{{rulesData.search.title}}</div>
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
          <div :key="index" class="item">
            <div v-if="li.title" class="field-name">{{li.title}}</div>
            <el-input
              v-model="rulesModel[ li.field ]"
              class="search-row"
              :placeholder="li.attr.placeholder || '请输入'+(li.title || li.field)"
            ></el-input>
          </div>
        </template>

        <!-- 选择框 -->
        <template v-if="li.type=='select'">
          <div :key="index" class="item">
            <div v-if="li.title" class="field-name">{{li.title}}</div>
            <el-select v-model="rulesModel[ li.field ]" clearable placeholder="请选择">
              <el-option
                v-for="item in li.selects"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </div>
        </template>

        <!-- 时间范围筛选 -->
        <template v-if="li.type=='datetimerange'">
          <div :key="index" class="item">
            <div v-if="li.title" class="field-name">{{li.title}}</div>
            <el-date-picker
              v-model="rulesModel[ li.field ]"
              type="datetimerange"
              :picker-options="pickerOptions"
              :value-format="li.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
              :format="li.format || 'yyyy-MM-dd HH:mm:ss'"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
          </div>
        </template>

        <!-- 时间范围筛选 -->
        <template v-if="li.type=='timerange'">
          <div :key="index" class="item">
            <div v-if="li.title" class="field-name">{{li.title}}</div>
            <el-time-picker
              is-range
              v-model="rulesModel[ li.field ]"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              :value-format="li.valueFormat ||  'HH:mm:ss'"
              :picker-options="{
                  format: li.format || 'HH:mm:ss'
                }"
            ></el-time-picker>
          </div>
        </template>

        <!-- 多选选择 -->
        <template v-if="li.type=='checkboxgroup' ">
          <div :key="index" class="item inline">
            <div v-if="li.title" class="field-name">{{li.title}}</div>
            <checkbox-group v-model="rulesModel[ li.field ]" :options="li.options"></checkbox-group>
          </div>
        </template>

        <!-- 数字范围 -->

        <template v-if="li.type=='numberrange' ">
          <div :key="index" class="item">
            <div v-if="li.title" class="field-name">{{li.title}}</div>
            <number-range v-model="rulesModel[ li.field ]" :placeholders="li.placeholders"></number-range>
          </div>
        </template>
      </template>

      <!-- 提交操作 -->
      <div v-if="!(rulesData.filters && rulesData.filters.length)" class="item">
        <el-button @click="submit">搜索</el-button>
      </div>
    </div>

    <!-- 操作栏目 -->
    <div v-if="rulesData.filters && rulesData.filters.length" class="operation-row">
      <el-button @click="submit">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
import {
  Input,
  Button,
  Select,
  Option,
  DatePicker,
  TimePicker,
  Checkbox
} from "element-ui";
import MuloCheckBoxGroup from "./../checkbox-group/CheckBoxGroup.vue";
import NumberRange from "./filters/NumberRange";

import { getType } from "./../utils/util";

console.log(MuloCheckBoxGroup);
export default {
  name: "mulo-filter-row",
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [TimePicker.name]: TimePicker,
    [Checkbox.name]: Checkbox,
    "checkbox-group": MuloCheckBoxGroup,
    [NumberRange.name]: NumberRange
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

          // 筛选框详细配置
          filters: []
        };
      }
    }
  },
  created() {
    //解析rules数据
    this.parseFilterData(this.rules);
  },
  data() {
    return {
      selectList: [],

      //规则数据
      rulesModel: {
        abd: 123,
        //时间筛选
        statusselect: []
      },
      rulesData: {
        // 搜索框
        search: {
          visible: true,
          field: "search",
          title: "搜索",
          placeholder: "搜索关键字"
        },

        // 筛选框底部操作栏
        oprationRow: {
          //搜索按钮类型
          type: "search"
        },

        filters: [],

        //筛选字段示例
        filtersDemo: [
          // 输入框筛选
          {
            type: "input",
            attr: {
              type: "number"
            },
            field: "name",
            title: "名称"
          },
          // select框筛选
          {
            type: "select",
            field: "status",
            title: "状态",
            selects: [
              { key: -1, value: "请选择" },
              { key: 0, value: "下架" },
              { key: 1, value: "正常" }
            ]
          },

          // 时间日期范围筛选
          {
            type: "datetimerange",
            field: "addtime",
            title: "添加时间"
          },

          //时间范围筛选
          {
            type: "timerange",
            field: "jobtime",
            title: "上班时间"
          },

          //多选筛选 checkboxgroup
          {
            type: "checkboxgroup",
            field: "statusselect",
            title: "状态筛选"
            // options: [
            //   { value: "1" },
            //   { value: "2" },
            //   { value: "3" },
            //   { value: "4" },
            //   { value: "5" },
            //   { value: "6" },
            //   { value: "7" }
            // ]
          },

          // 数值范围
          {
            type: "numberrange",
            field: "numberrange",
            title: "商品成本价",
            placeholders: ["最低", "最高"]
          }
        ],

        //选择列表
        checkItems: [],

        //导出配置
        export: {
          //导出按钮显示
          visible: true,
          fields: [
            { field: "title", title: "标题" },
            { field: "addtime", title: "添加时间" }
          ],
          //是否可以自定义导出字段
          canSelect: false
        },

        //每个筛选字段注入css类名,便于控制定位
        joinClass: false,
        class: ""
      },

      // 筛选的数据
      rulesModel: {
        search: "",
        status: 0
      },
      // 日期时间选择范围的快捷选择
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      resetStatus: false
    };
  },
  methods: {
    // 提交筛选
    submit() {
      console.log(this.rulesModel);
      this.$emit("filter", {
        data: this.rulesModel
      });
    },
    //重置筛选数据
    reset() {
      //重新加载所有筛选组件
      this.resetStatus = true;
      this.rulesModel = {};
      this.$nextTick(() => {
        this.resetStatus = false;
      });
      this.$emit("filter", {
        data: this.rulesModel
      });
    },
    //读取输入的数据
    parseFilterData(rules) {
      //搜索的不同数据类型配置
      if (typeof rules.search == "string") {
        this.rulesData.search.visible = true;
        this.rulesData.search.placeholder = rules.search;
      } else if (typeof rules.search == "boolean") {
        this.rulesData.search.visible = rules.search;
      } else if (typeof rules.search == "object") {
        this.rulesData.search = rules.search;
      }

      //筛选详细配置
      if (rules.filters) {
        this.rulesData.filters = rules.filters;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$spaceDefault: 10px;

.filter-rows {
  padding: $spaceDefault 0;
  display: flex;
  flex-wrap: wrap;
  .item {
    padding: $spaceDefault;
    padding-left: 0;
    display: flex;
    align-items: center;
    .field-name {
      padding-right: $spaceDefault/2;
    }
    &.inline {
      min-width: 100%;
    }
  }
}
.search-row {
  width: 150px;
}
</style>