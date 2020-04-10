<template>
  <div>
    <slot name="tip"></slot>
    <list-default ref="list_default" :api="api" :params="params" :filter="filter">
      <template v-slot:table="{vmdata}">
        <!-- <draggable v-model="vmdata.list" tag="tbody">
          <tr v-for="item in vmdata.list" :key="item.name">
            <td scope="row">{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.sport }}</td>
          </tr>
        </draggable>-->

        <table class="table">
          <slot name="thead">
            <thead class="thead-dark">
              <tr>
                <slot name="thead_item">
                  <th scope="col">th1</th>
                  <th scope="col">th2</th>
                  <th scope="col">th3</th>
                </slot>
              </tr>
            </thead>
          </slot>

          <draggable v-model="vmdata.list" tag="tbody" @end="onEnd(vmdata.list ,$event)">
            <tr v-for="(li,index) in vmdata.list" :key="index">
              <slot name="item" :item="li" :index="index">
                <td>{{index}}</td>
              </slot>
            </tr>
          </draggable>
        </table>
      </template>
    </list-default>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import ListDefault from "./Default";
export default {
  name: "list-sort",

  components: {
    draggable,
    [ListDefault.name]: ListDefault
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
    filter: {
      type: Object,
      default: () => {
        return {};
      }
    },
    params: {
      type: Object,
      default: () => {
        return {};
      }
    },
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
    // 选择
    listIdKey: {
      type: String,
      default: "id"
    },
    // 接口地址
    api: {
      type: String,
      default: ""
    }
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
  methods: {
    name() {},
    getList() {},
    onEnd(list, e) {
      // 获取新的排序
      this.$emit("dragsort", {
        list: list,
        e: e
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>