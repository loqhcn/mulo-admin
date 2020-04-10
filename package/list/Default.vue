<template>
  <div class="mulo-list-default">

    <!-- 筛选栏目 -->
    <div class="filter">
      <!-- 解析筛选字段 -->
      <mulo-filter-row @filter="onFilter" :rules="filter"></mulo-filter-row>
    </div>

    <slot name="table" :vmdata="$data" >
      <table class="table">
        <slot name="thead" :rows="rows">
          <thead>
            <tr>
              <!-- # 头部 -->
              <slot name="rows" :rows="rows">
                <template v-for="(li,index) in rows">
                  <slot name="rows-item" :index="index">
                    <td :key="index">{{li}}</td>
                  </slot>
                </template>
              </slot>
            </tr>
          </thead>
        </slot>
        <slot name="tbody" :vmdata="$data">
          <tbody>
            <!-- # 列表 -->
            <tr v-for="(li,index) in list" :key="index">
              <slot name="item" :item="li" :index="index">
                <td>{{index}}</td>
              </slot>
            </tr>
          </tbody>
        </slot>
      </table>
    </slot>

    <div class="table-footer">
      <div>
        <!-- 分页 -->
        <pagination
          @current-change="currentChange"
          :total="total"
          :page-size="psize"
          :current-page="page"
          @size-change="sizeChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></pagination>
      </div>
      <slot name="footer-right">
        <div class="footer-right"></div>
      </slot>
    </div>
  </div>
</template>

<script>
// 分页组件
// import Pager from "./../pagination/Pager";
import { Pagination } from "element-ui";
// 筛选组件
import FilterRow from "./FilterRow";
// 配置规则
import RulesSetting from "./../RulesSetting";
const rulesConfig = RulesSetting.getRules();

export default {
  name: "list-default",
  components: {
    pagination: Pagination,
    [FilterRow.name]: FilterRow
  },
  props: {
    // 字段数据
    rows: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 筛选配置
    filter:{
      type:Object,
      default:()=>{
        return {}
      }
    },

    refreshTag: {
      type: Number
    },
    //接口地址
    api: {
      default: ""
    },
    //请求参数
    params: {
      type: Object,
      default: () => {
        return {};
      }
    },
    //数据渲染中间操作
    renderList: {
      type: Function,
      default: list => {
        return list;
      }
    }
  },
  data() {
    return {
      key: "",
      // 分页
      page: 1,
      total: 10,
      psize: 10,
      // 列表数据
      list: [],
      //更多查询参数
      moreParams: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    isCheckEd(item) {},
    /**
     * 加载列表
     *
     * @props api 设置过了通过内置加载 | 通过事件+refs加载
     *
     * @param {Boolean} reset 是否重置(分页)
     *
     */
    getList(reset) {
      //没有设置api 通过这个直接调用
      if (reset) {
        this.page = 1;
      }
      if (!this.api) {
        this.$emit("get-list", this.page);
        return;
      }
      this.loadLostData();
    },
    /**
     * 加载列表
     *
     * @param {Object} params 新的参数
     *
     * @example this.$refs.xxx.loadLostData(true)
     */
    loadLostData(reset, callback) {
      let params = {
        page: this.page,
        psize: this.psize,
        // 基础查询参数
        ...this.params,
        //更多筛选
        ...this.moreParams
      };
      //get查询
      if (this.method == "get") {
        params = {
          params: params
        };
      }
      this.$http.post(this.api, params).then(res => {
        if (res.code != 200) {
          this.$toast(res.msg);
          return;
        }
        //列表数据
        let list = res.data.list;
        //处理
        list = this.renderList(list);
        //渲染
        this.list = list;
        this.total = res.data.total;
      });
    },
    name() {},
    //读取字段名称
    rowsName() {},
    /**
     * psize修改
     *
     * @todo 加载新的列表
     */
    sizeChange(size) {
      this.$emit("size-change", size);
      this.psize = size;
      this.getList();
    },
    /**
     * 分页改变
     *
     * @todo 加载列表
     */
    currentChange(page) {
      page = Math.max(1, page);
      console.log(page);
      this.page = page;
      this.getList();
    },
    /**
     * 筛选提交
     *
     */
    onFilter(res) {
      let filters = res.data;
      this.moreParams[rulesConfig.filters.paramName] = filters;
      this.getList(true);
    }
  }
};
</script>

<style lang="scss" scoped>
//传统列表组件
.mulo-list-page {
  .item {
  }
}
.table {
  width: 100%;
  thead {
    tr {
      td {
        // color: #4e4e4e;
      }
    }
  }
  tbody {
    tr {
      td {
      }
    }
  }
}
</style>