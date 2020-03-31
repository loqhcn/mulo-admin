<template>
  <div>
    <ul class="mulo-pgination flex">
      <li @click="currentChange(currentPage-1)" >«</li>
      <li >{{currentPage}}</li>
      <li @click="currentChange(currentPage+1)" >»</li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {

  },
  components: {
    
  },
  computed: {
    name() {
      
    }
  },
  props: {
    total: {
      type: Number,
      default: 10
    },
    psize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {

    };
  },
  methods: {
    //点击页面
    currentChange(page) {
      this.$emit('current-change',page);
    }

  }
};
</script>

<style lang="scss" scoped>
.mulo-pgination{
  li{
    display: block;
    padding: 0.3rem 1rem;
    border: 1px solid black;
    
  }
  li+li{
    margin-left: 0.2rem;
  }
}
</style>