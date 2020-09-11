<template>
  <div>
    <el-page-header @back="appRoute.back()" content="项目管理"></el-page-header>
    <el-tabs v-model="tab" type="card">
      <el-tab-pane label="应用管理" name="apps">
        <mulo-list-default ref="list" api="cl/app/list" :params="params">
          <template v-slot:table="{vmdata}">
            <el-table class="zoo-table" :data="vmdata.list" style="width: 100%">
              <el-table-column fixed prop="id" label="ID" width="60"></el-table-column>
              <el-table-column prop="title" label="应用名" ></el-table-column>
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
  computed: {
    params() {
      return {
        project_id: this.project_id,
      };
    },
  },
  data() {
    return {
      project_id: this.$route.query.id,
      tab: "apps",
    };
  },
  methods: {
    edit(row) {
      this.appRoute.go("/component-layout/main", {
        id: row.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>