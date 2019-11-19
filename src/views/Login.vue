<template>
  <div>
    <div class="fixed-center panel">
      <div class="flex center align-center">mulo-ui-admin</div>
      <div class="item-mt-10">
        <div class>
          <label>账号:</label>
          <input v-model="username" type="text" class="form-control" />
        </div>

        <div class>
          <label>密码:</label>

          <input v-model="password" type="password" class="form-control" />
        </div>

        <div class="center">
          <button @click="login" class="btn full btn-success">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "admin",
      password: "admin123"
    };
  },
  methods: {
    name() {},
    login() {
      this.$http
        .post("user/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.errno) {
            this.$toast(res.msg);
            return;
          }
          //登录成功
          this.$toast("登录成功");
          //
          localStorage.setItem("admin_auth_token", res.data.auth_token);

          this.$router.push("/index");
        });
    }
  }
};
</script>

<style  scoped>
</style>