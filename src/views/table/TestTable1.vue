<template>
  <div style="width:50vw;">

    <mulo-list-default
      :rows="[
          '排序','ID','分类名称','图标','首页展示','状态','操作'
      ]"
      :list="list"

      @get-list="getList"
    >
      <!-- 列表 -->
      <template v-slot:item="{item}">
        <td>{{item.sorting}}</td>
        <td>{{item.category_id}}</td>
        <td>{{item.category_name}}</td>
        <td>图标</td>
        <td>首页展示</td>
        <td>状态</td>
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
      list: [
        { name: "罗戚洪", sex: "男", lovely: "女" },
        { name: "罗戚洪", sex: "男", lovely: "女" },
        { name: "罗戚洪", sex: "男", lovely: "女" },
        { name: "罗戚洪", sex: "男", lovely: "女" }
      ]
    };

  },
  created () {
    this.getList();
  },
  methods: {
    getList(page) {
      this.list = [];
      this.$http.get('http://s.zoo.cn/zoocoffee/goods_category/cates').then(res=>{
        // console.log(res);
        this.list = res.data.list;

      })
    },
    
    
  },
};
</script>

<style lang="scss" scoped>
</style>