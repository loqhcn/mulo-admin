import formCreateRender from './formCreateRender'
export default {
    name: 'form-create',
    props: {
        //生成规则配置
        rules: {
            type: Array,
            default: [],
        },
    },
    data() {
        return { rule: this.rules, option: [] };
    },
    render() {
        return formCreateRender(this);
    },

}