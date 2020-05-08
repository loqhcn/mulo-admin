
//vue vNode内置规则
const propsNames = [
    'class',
    'style',
    'attrs',
    'props',
    'domProps',
    'on',
    'nativeOn',
    'directives',
    'scopedSlots',
    'slot',
    'ref',
    'key'
];


//form-create-field 表单字段附加规则 , 配置规则同vue的props
const fieldRule = {
    //验证
    'validate': {
        type: Array,
        default: () => {
            return [];
        }
    },
    //字段
    'field': {
        type: String,
        default: 'name'
    },
    //col布局
    'col': {
        type: Object,
        default: () => {
            return {

            }
        }
    },
   
    //字段标题
    'title': {
        default: ""
    },
    
};

//字段名列表
let fieldNames = Object.keys(fieldRule)

export {
    propsNames,
    fieldNames,
    fieldRule
}