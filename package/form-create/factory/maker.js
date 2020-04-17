/**
 * 构建vnode规则
 * 
 * 
 */
class maker {

    constructor() {

        this.validate = false
        this.rules = [

        ]
        this.type = '';

    }

    /**
     * 验证规则
     * @param {*} rule 
     */
    validate(rule) {

        return this;

    }

 
    upload() {

    }

    /**
     * 获取组件名称
     * 
     */
    getComponentName() {

    }

    /**
     * 设置布局方式为col
     * 
     */
    col(col) {
        this.rule.col = col;
    }

    /**
     * 表单验证规则
     * 
     */
    validate(){
        
        return this;
    }


    /**
     * 
     * 
     */
    props() {

    }

    /**
     * 生成最终生成表单的json
     * 
     */
    toJson() {

    }
    
    /**
     * 子组件 参数为jsonvue的参数
     * 
     */
    children(){

    }

}



/**
 * 代理调用maker类
 * 
 */
class MakerCall {

    constructor() {
        
    }

    getObj(){

    }

    type(){
        
    }

    //字段

    input() {
        
    }

    //图片
    img() {


    }

    
}

export default new MakerCall();

