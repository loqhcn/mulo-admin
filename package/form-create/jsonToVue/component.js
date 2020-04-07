/**
 * 
 * @param {*} jv 组件配置
 * 
 * @return  
 * 
 */
export default function component(jv) {
    let jsonRender;
    return {
        mixins: [jv.config],
        data() {
            return {
                jv_$rule: jv.config.rule
            };
        },
        beforeCreate() {
            jsonRender = new Render(jv, this);
        },
        render() {
            return jsonRender.render();
        }
    };
}