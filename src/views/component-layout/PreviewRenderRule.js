//编译vuejson
import VueJsonRender from '../../../package/src/form-create/core/VueJsonRender'

export default {
    name: 'preview-render-rule',
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
        value:{
            deep:true,
            handle:(newValue,oldValue)=>{
                console.log(newValue)
            }
        }
    },
    data() {
        return {
            unique: 0,

            //规则数据
            rulesParseData: () => {
                return this.value
            }

        }
    },
    methods: {
        //通过变量刷新组件
        _refresh(rules) {
            this.$forceUpdate();
            this.$emit('input', rules);
        },
    },
    render(h) {
        let _this = this;
        return (new VueJsonRender(this)).render();
    },
}