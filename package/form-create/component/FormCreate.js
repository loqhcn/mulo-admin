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
        value: {
            handler(newValue, oldValue) {
                // if (this.paramsUpdateReload) {
                //     this.getList(true);
                // }
                this.$emit('input', newValue)
            },
            deep: true
        },
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

