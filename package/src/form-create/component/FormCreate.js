import VueJsonRender from './../core/VueJsonRender.js'

import RuleParse from './../core/RuleParse'

export default {
    name: 'form-create',
    props: {
        // v-model的数据
        value: {
            type: Object,
            default: () => {
                return {

                }
            },
        },
        //规则
        rules: {
            type: Array,
            default: () => {
                return []
            }
        },
        //底部设置
        footerSetting: {
            type: Object,
            default: () => {
                return {
                    visible: true
                }
            }
        }


    },
    data() {
        return {
            rule: this.rules,

            option: [],
            //组件规则,  目前只能这样获取, 直接设置导致无效
            rulesParseData: () => {
                return this.parseRule(this.rules)
            },
            renderTag: 1,
            //刷新渲染组件渲染的条件
            unique: 0,
        };
    },
    watch: {
        value: {
            handler(newValue, oldValue) {
                console.log('watch value', newValue)
                // if (this.paramsUpdateReload) {
                //     this.getList(true);
                // }
                // this.$emit('input', newValue)
            },
            deep: true
        },
        rules() {
            // this.rulesParseData = this.parseRule(this.rules)
        },


    },
    /**
     * 组件表
     * 
     */
    render() {
        let _this = this;

        return (new VueJsonRender(this)).render();
    },
    methods: {
        //通过变量刷新组件
        _refresh() {
            ++this.unique;
        },
        //编译传入的规则 生成jsonvue规则
        parseRule(rules) {
            let obj = new RuleParse(this);
            let data = obj.parse(this.rules);
            return data
        },
       

    },



}

