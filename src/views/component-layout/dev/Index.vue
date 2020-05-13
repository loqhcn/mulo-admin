<template></template>
<script>
import Render from "./../compile/Render";
export default {
  components: {

  },
  data() {
    return {
      name: "罗戚洪",
      viewId: 1,

      clViews: this.$views
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
  mounted() {
    
  },
  render(h) {},
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