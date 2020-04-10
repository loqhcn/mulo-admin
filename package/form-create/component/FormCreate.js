import FormCreateRender from './formCreateRender'
export default {
    name: 'form-create',
    props: {
        //生成规则配置
        rules: {
            type: Array,
            default: () => {
                return []
            },
        },

    },
    data() {
        return {
            rule: this.rules,
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
    },
    methods: {
        /**
     * 编辑rule参数
     * 
     * @todo 深度复制rules
     * @todo field绑定处理
     * 
     * @return 处理后的rulle
     */
        parseRule(rules, isChildren) {
            const $rules = [];

            rules.forEach((li, index) => {

                let $on = this.getActions(li.on);

                $rules[index] = {
                    //标签
                    type: li.type,

                    //样式
                    class: li.class,
                    style: li.style,
                    attrs: li.attrs,
                    // DOM 属性

                    //组件 prop
                    props: li.props,
                    domProps: li.domProps,
                    props: li.props,
                    nativeOn: li.nativeOn,
                    directives: li.directives,
                    scopedSlots: li.scopedSlots,

                    slot: li.slot,
                    key: li.key,
                    ref: li.ref,
                    refInFor: li.refInFor,
                    //自定义事件监听
                    // on:li.on,
                    on: {
                        //设置的其它事件不做中间处理
                        ...$on,
                        input(e) {
                            li.on && li.on.input && li.on.input(e);
                            
                            
                            
                            //事件冒泡阻止
                            event.stopPropagation()
                        }

                    }

                }

                if (li.children && li.children.length) {
                    $rules[index].children = this.parseRule(li.children, true);
                }

                // $rules.push($rule);

            })
            if (!isChildren) {
                console.log('规则', $rules)

            }
            return $rules;
        },
        parseChilren() {

        },
        //
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

