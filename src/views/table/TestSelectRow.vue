<template>
  <div>
    <div class="shadow">
      <div class="panel manage shadow-container">
        <select-rows
          :rows="[
              'ID','商品名称','图标','首页展示','状态','操作'
          ]"
          list-id-key="id"
          :selecteds="[
            32,33
          ]"
          api="http://admin-tp6.lqh.cn/apis/news/index"
          @success="success"
          :params-update-reload="false"
        >
          <!-- 列表 -->
          <template v-slot:item="{item}">
            <td>{{item.goods_id}}</td>
            <td>{{item.goods_name}}</td>
            <td>图标</td>
            <td>首页展示</td>
            <td>状态</td>
            <td>
              <button class="btn">编辑</button>
            </td>
          </template>
        </select-rows>
      </div>
    </div>
  </div>
</template>

<script>
import selectRows from "./../../../package/list/SelectRows";
export default {
  // 参数
  components: {
    "select-rows": selectRows
  },
  props: {},
  methods: {
    success(data) {
      console.log(data);
    }
  },
};
</script>

<style lang="scss" scoped>
.shadow {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255,255,255,0.6);
}
.shadow-container {
  box-sizing: border-box;
  width: 90%;
  min-height: 100px;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px black;
  max-height: 100vh;
  overflow-y: scroll;
  
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
}
</style>