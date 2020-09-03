export default {
    data() {
        return {
            //vue json 本体
            $element: null,
            //编辑器中的 组件实例
            componentInstance: null,

            loading: true,
        };
    },
    created() {
        for (var x in this.row) {
            console.log(x);
            this.row[x] = this.componentInstance[x];
        }
        this.loading = false;
    },
    watch: {
        row: {
            handler(newdata, olddata) {
                console.log(newdata);
                this.$data.$element.props = newdata;
                if (!this.loading) {
                    this.$control.render._refresh();
                }
            },
            deep: true,
        },
    },
    props: {
        value: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    methods: {
        点击() { },
    },
}