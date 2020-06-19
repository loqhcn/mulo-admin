<template>
  <div style="width:100vw;">
    <mulo-list-default
      :rows="[
          '标题','状态','添加时间','操作'
      ]"
      :filter="filter"
      :params="params"
      api="http://admin-tp6.lqh.cn/apis/news/index"
    >
      <!-- 选择栏橱窗 -->
      <template v-slot:filter-before>
        <div class="tabmenu">
          <ul class="nav nav-pills">
            <li
              v-for="(li,index) in menus"
              @click="menuActive=index"
              :class="{active:index==menuActive}"
              :key="index"
            >
              <a href="#">{{li}}</a>
            </li>
          </ul>
          <button class="btn btn-primary">新增分类</button>
        </div>
      </template>

      <!-- 列表 -->
      <template v-slot:item="{item}">
        <td>{{item.title}}</td>
        <td>状态</td>
        <td>{{item.addtime}}</td>

        <td>
          <button class="btn">编辑</button>
          <button class="btn">删除</button>
        </td>
      </template>
    </mulo-list-default>

    <!-- 弹出层-编辑 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: ["首页橱窗分类列", "全部商品分类列表"],
      menuActive: 0,
      params: {
        type: 1
      },
      filter: {
        search: false,
        filters: [
          {
            type: "input",
            attr: { type: "number" },
            field: "name",
            title: "名称"
          },
          {
            type: "select",
            field: "status",
            title: "名称",
            selects: [
              { key: 1, value: "上架" },
              { key: 2, value: "下架" },
              { key: 3, value: "售罄" }
            ],
            attr: {}
          },
          {
            type: "numberrange",
            field: "numberrange",
            title: "商品成本价",
            placeholders: ["最低", "最高"],
            attr: {}
          },
          { type: "input", field: "search", title: "关键词", attr: {} },
          {
            type: "datetimerange",
            field: "addtime",
            title: "上架时间",
            attr: {}
          },
          {
            type: "datetimerange",
            field: "addtime",
            title: "下架时间",
            attr: {}
          },
          {
            type: "checkboxgroup",
            field: "attr1",
            title: "状态筛选",
            className: "inline",

            options: [
              { value: "默认" },
              { value: "红色" },
              { value: "白色" },
              { value: "黄色" }
            ],
            attr: {}
          },
          {
            type: "checkboxgroup",
            field: "attr5",
            title: "状态筛选",
            className: "inline",
            options: [
              { value: "5寸" },
              { value: "8寸" },
              { value: "10寸" },
              { value: "12寸" },
              { value: "15寸" },
              { value: "6寸" },
              { value: "7寸" },
              { value: "17寸" },
              { value: "20寸" },
              { value: "25寸" },
              { value: "30寸" },
              { value: "31寸" },
              { value: "32寸" },
              { value: "33寸" },
              { value: "123" },
              { value: "123123" },
              { value: "1231234" },
              { value: "3" },
              { value: "5" }
            ],
            attr: {}
          }
        ]
      },

      list: []
    };
  },
  watch: {
    //状态切换 修改参数
    menuActive: function(newValue, oldValue) {
      this.params.type = newValue == 1 ? 2 : 1;
    }
  },
  created() {
    this.getList();

    this.$nextTick(() => {
      //筛选
      this.$set(this.filter, "filters", [
        // 时间日期范围筛选
        {
          type: "datetimerange",
          field: "addtime",
          title: "预约时间"
        }
      ]);
    });
  },
  methods: {
    getList(page) {
      // this.list = [];
      // this.$http
      //   .get("http://s.zoo.cn/zoocoffee/goods_category/cates")
      //   .then(res => {
      //     // console.log(res);
      //     this.list = res.data.list;
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>