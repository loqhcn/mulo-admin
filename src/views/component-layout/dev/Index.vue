
<template>
  <div>
    <button @click="emit">asdf</button>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "罗戚洪"
    };
  },

  sockets: {
    // view(data) {
    //   console.log("view", data);
    // },
    // view2(data) {
    //   console.log("view", data);
    // },
    // connect: function() {
    //   console.log("socket connected");
    // }
  },
  mounted() {},
  methods: {
    emit() {
    
      this.$socket.emit("view", {
        name: "罗戚洪"
      });


    }
  }
};
</script>

<style lang="scss" scoped>
// 同步css
</style>