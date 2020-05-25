//编译vuejson
import VueJsonRender from './../../../../package/src/form-create/core/VueJsonRender'
import { isType } from './../../../../package/utils/util'
import RuleParse from './Parse'
import ComponentContainer from './../components/ComponentContainer'

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

    },
    created() {
        ruleParse = new RuleParse(this);
    },
    data() {
        return {
            unique: 0,
            //当前选中组件(加边框和操作)
            activeId: 0,
            //规则数据
            rulesParseData: () => {
                return this.parse();
            },
            //当前选中的 Rule 的本体
            activityRule: false,
            //当前选中的 ComponentContainer 组件实例
            activityContainer: false,
        }
    },

    methods: {
        //通过变量刷新组件
        _refresh(rules) {
            this.$forceUpdate();
            this.$emit('input', rules);
        },
        /**
         * 选中组件
         * 
         * @todo 显示属性设置面板,创建边框标记
         * 
         * @param id rules里的每个组件分配的唯一id
         */
        selectComponent() {

            let componentRule = ruleParse.componentsList[this.activityRule.id];

            //右侧属性规则
            this.$parent.$parent.attributeRules = componentRule.renderAttributeEdit ?
                componentRule.renderAttributeEdit(this.activityRule)
                : [];
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