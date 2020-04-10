<template>
  <div style="width:100vw;">
    <mulo-list-default
      :rows="[
          '标题','状态','添加时间','操作'
      ]"
      :filter="filter"
      api="http://admin-tp6.lqh.cn/apis/news/index"
    >
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
      filter: {
        search: "标题/ID/内容关键词",
        filters: [
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
        ]
      },

      list: []
    };
  },
  created() {
    this.getList();
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