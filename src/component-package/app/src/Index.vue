
<script>
export default {
  name: "index",
  props: {
    title: {
      type: String,
      default: "app index title",
    },
  },
  data() {
    return {};
  },
  render() {
    return <div> {this.title} </div>;
  },
};
</script>

<style lang="scss" scoped>
</style>