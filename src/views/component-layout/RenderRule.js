//编译vuejson
import VueJsonRender from './../../../package/src/form-create/core/VueJsonRender'
import { isType } from './../../../package/utils/util'

import RuleParse from './core/RuleParse'
import ComponentContainer from './ComponentContainer'

let ruleParse = false;

export default {
    components: {
        'cl-container': ComponentContainer
    },
    name: 'render-rule',
    props: {
        // model rules
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
    created() {
        ruleParse = new RuleParse(this);
    },
    data() {
        return {
            unique: 0,

            //创建之前
            ruleParse: false,

            //规则数据
            rulesParseData: () => {
                return this.parse();
            }

        }
    },

    methods: {
        //通过变量刷新组件
        _refresh(rules) {
            this.$forceUpdate();
            this.$emit('input', rules);

        },

        parse() {

            return ruleParse.parse(this.value);

        }
    },
    render(h) {
        let _this = this;
        return (new VueJsonRender(this)).render();
    },
}