<template>
  <div>
    <mulo-form-default>
      <mulo-form-row title="姓名">
        <input type="text" class="form-control" />
      </mulo-form-row>
    </mulo-form-default>

    <sort
      @dragsort="sort"
      :params="{id:1}"
      api="http://s.zoo.cn/zoocoffee/goods_category/goods_sort_list"
    >
      <template v-slot:tip>
        <div>拖动改变商品排序 ,请把每页数量调到最大</div>
      </template>

      <template v-slot:thead_item>
        <td>图标</td>
        <td>首页展示</td>
        <td>首页展示</td>
      </template>

      <template v-slot:item="{item}">
        <td>{{item.goods_name}}</td>
        <td>图标</td>
        <td>首页展示</td>
      </template>
    </sort>
  </div>
</template>

<script>
import sort from "./../../../package/list/Sort";
export default {
  components: {
    sort
  },
  data() {
    return {
      list: [
        { id: 1, name: "Abby", sport: "basket" },
        { id: 2, name: "Brooke", sport: "foot" },
        { id: 3, name: "Courtenay", sport: "volley" },
        { id: 4, name: "David", sport: "rugby" }
      ],

      dragging: false
    };
  },
  created() {
    this.info();
  },
  methods: {
    info() {},
    submit() {},
    sort(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>