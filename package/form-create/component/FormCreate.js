import FormCreateRender from './formCreateRender'

import RuleParse from './../core/RuleParse'

export default {
    name: 'form-create',
    props: {
        // 生成规则配置
        value: {
            type: Object,
            default: () => {
                return {

                }
            },
        },
        rules: {
            type: Array,
            default: () => {
                return []
            }
        },
        
        

    },
    data() {
        return {
            rule: this.rules,
            row: {
                name: "罗戚洪",
                name2: "mulo"
            },
            option: [],
            rulesParseData: () => {
                return this.parseRule(this.rules)
            },
            renderTag: 1,
        };
    },

    watch: {

        rules() {
            this.rulesParseData = this.parseRule(this.rules)
        }

    },
    /**
     * 组件表
     * 
     */
    render() {
        let _this = this;
        return (new FormCreateRender(this)).render();

        // 渲染表单

        //

    },
    methods: {

        /**
         * 
         * 
         * 
         */
        handleInputEvent() {

        },
        //编译传入的规则 生成jsonvue规则
        parseRule(rules) {
            let obj = new RuleParse(this);
            let data = obj.parse(this.rules);
            console.log(data)
            return data
        },


        /**
         * 编译rule参数 * 暂时废弃,目前只使用了生成表单的规则
         * 
         * @logic 参数中会包含一些特殊生成规则 , 如表单字段规则 , 需要转换为对应vnode规则
         * @logic vmodel实现 props传入value , 通过input/change事件等更新新的值
         * @todo 深度复制rules
         * @todo field绑定处理
         * 
         * @return 处理后的rulle
         */
        // parseRule(rules, isChildren) {
        //     var _this = this;

        //     const $rules = [];

        //     rules.forEach((li, index) => {
        //         let $on = this.getActions(li.on);
        //         let _this = this;

        //         $rules[index] = {
        //             //标签
        //             type: li.type,

        //             //样式
        //             class: li.class,
        //             style: li.style,
        //             attrs: li.attrs,
        //             // DOM 属性

        //             //组件 prop
        //             props: li.props,
        //             domProps: {
        //                 value: this.row.name,
        //                 // 'v-model':this.row.name,
        //             },
        //             props: li.props,
        //             nativeOn: li.nativeOn,
        //             directives: li.directives,
        //             scopedSlots: li.scopedSlots,

        //             slot: li.slot,
        //             key: li.key,
        //             ref: li.ref,
        //             refInFor: li.refInFor,
        //             //自定义事件监听
        //             // on:li.on,
        //             on: {
        //                 //设置的其它事件不做中间处理
        //                 ...$on,
        //                 input(e) {
        //                     // _this.$emit('input', event.target.value)
        //                     // console.log('input emit', event.target.value)
        //                     //触发原本事件
        //                     li.on && li.on.input && li.on.input(e);
        //                     //事件冒泡阻止
        //                     event.stopPropagation()
        //                 }
        //             }
        //         }
        //         if (li.children && li.children.length) {
        //             $rules[index].children = this.parseRule(li.children, true);
        //         }
        //     })
        //     if (!isChildren) {
        //         console.log('规则', $rules)

        //     }
        //     return $rules;
        // },

        /**
         * 
         * 
         */
        parseChilren() {

        },
        /**
         * 通过的rules生成的组件的事件, 通过复写事件的方式实现插入 v-model功能
         * 
         * @param {*} on 
         */
        getActions(on) {
            let $on = {

            }
            if (on) {
                for (let x in on) {
                    if (x != 'input' && x != 'change') {
                        $on[x] = on[x]
                    }
                }
            }
            return $on;
        }


    },




}

