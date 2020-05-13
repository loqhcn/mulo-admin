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
        value: {
            handler(newdata, olddata) {
                console.log(newdata )
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
            //当前选中组件(加边框和操作)
            activeId: 0,
            
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
        /**
         * 选中组件
         * 
         * @todo 显示属性设置面板,创建边框标记
         * 
         * @param id rules里的每个组件分配的唯一id
         */
        selectComponent(id) {
            this.activeId = id;
            //显示面板
            let $element = ruleParse.idsMap[id];
            let componentRule = ruleParse.componentsList[$element.id];

            console.log(
                $element,
                componentRule
            )
            //Main里更新操作规则
            //右侧属性数据
            
            //右侧属性规则
            this.$parent.$parent.attributeRules = componentRule.renderAttributeEdit ?
                componentRule.renderAttributeEdit($element)
                :
                [];
            
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