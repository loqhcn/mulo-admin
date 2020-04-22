//编译vuejson
import VueJsonRender from './../../../package/src/form-create/core/VueJsonRender'
import RuleParse from './core/RuleParse'
export default {
    name: 'render-rule',
    props: {
        value: {
            type: Array,
            default: () => {
                return []
            }
        },
    },
    watch: {

        rules: {
            handler(newdata, olddata) {

            },
            deep: true
        }

    },
    data() {
        return {
            flush: 0,

            //规则数据
            rulesParseData: () => {
                return this.parse();
            }

        }
    },
    methods: {
        name() {

        },
        flushDo(rules) {

            

            this.$set(this.$data, 'flush', this.flush + 1)

        },
        parse() {
            
            let obj = new RuleParse(this);

            return obj.parse(this.value);

        }
    },
    render(h) {
        let _this = this;
        return (new VueJsonRender(this)).render();
    },
}