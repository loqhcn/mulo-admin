
/**
 * 列表默认页面混入
 * @desc 其他基于list-default的组件 需要继承参数
 * 
 * 
 */
const ListDefualtMixin = {
    props: {
        // 筛选配置
        filter: {
            type: Object,
            default: () => {
                return {};
            }
        },

        // 接口地址
        api: {
            type: String,
            default: ""
        },

        // 字段数据
        rows: {
            type: Array,
            default: () => {
                return [];
            }
        },

        //请求参数
        params: {
            type: Object,
            default: () => {
                return {};
            }
        },

        //数据渲染中间操作
        renderList: {
            type: Function,
            default: list => {
                return list;
            }
        },
        //当参数改变时 自动重新加载列表
        paramsUpdateReload: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
           
        }
    },
    mounted() {
        
    },
}

export { ListDefualtMixin }