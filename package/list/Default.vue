<template>
  <div class="mulo-list-default">
    <table class="table">
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

      <tbody>
        <!-- # 列表 -->
        <tr v-for="(li,index) in list" :key="index">
          <slot name="item" :item="li">
            <td>一个td</td>
          </slot>
        </tr>
      </tbody>

      <!-- # 表格底部 -->
      <tfoot>
        <div class="table-footer">
          <div>
            <!-- 分页 -->
            <pagination
              @current-change="currentChange"
              :total="total"
              :psize="psize"
              :current-page="page"
            ></pagination>
          </div>
          <slot name="footer-right">
            <div class="footer-right"></div>
          </slot>
        </div>
      </tfoot>
    </table>
  </div>
</template>

<script>
// 分页组件
import Pager from "./../pagination/Pager";

export default {
  name: "list-default",
  components: {
    pagination: Pager
  },
  props: {
    // 字段数据
    rows: {
      type: Array,
      default: []
    },
    // 列表数据
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      key: "",
      // 分页
      page: 1,
      total: 10,
      psize: 10
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$emit("get-list", this.page);
    },
    name() {},
    //读取字段名称
    rowsName() {},
    // 分页改变
    currentChange(page) {
      page = Math.max(1, page);
      console.log(page);
      this.page = page;
      this.getList();
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
</style>