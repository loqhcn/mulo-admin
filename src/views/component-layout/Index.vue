<template>
  <div>
    <router-link class="title" to="/component-layout/main">component-layout</router-link>
    <el-tabs v-model="tab" type="card">
      <el-tab-pane label="项目管理" name="projects">
        <mulo-list-default ref="list" api="cl/project/list">
          <template v-slot:table="{vmdata}">
            <el-table class="zoo-table" :data="vmdata.list" style="width: 100%">
              <el-table-column fixed prop="id" label="ID" width="60"></el-table-column>
              <el-table-column prop="title" label="名称"></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template v-slot:default=" { row }">
                  <div class="operations">
                    <a class="btn hollow" @click="edit(row)">编辑</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </mulo-list-default>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "projects",
    };
  },
  methods: {
    edit(row) {
      this.$router.push({
        path: "/component-layout/project/detail",
        query: {
          id: row.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>