import { propsNames, fieldNames } from './../core/rule'
import { builtIn } from './../ui/element/rule'

/**
 * 构建form-create-json规则
 * 
 * 
 */
class Maker {

    constructor(type) {
        //调用函数设置规则
        this.rules = {

        }
        //组件类型
        this.type = type;
        //maker组件标识
        this.__ismaker = true;

    }

    // 绑定默认值
    value(value) {
        console.log(value)
        this.rules.attrs = Object.assign({
            value: value
        }, (this.rules.attrs || {}))


        return this;
    }


    /**
     * 生成最终生成表单的json
     * 
     */
    toJson() {
        let values = {

        }
        let actionNames = [
            ...propsNames,
            ...fieldNames
        ];
        actionNames.forEach((name) => {
            values[name] = this.rules[name];
        })
        return {
            type: this.type,
            ...values
        }
    }

    /**
     * 注册验证完成后的事件
     * 
     * @param {*} callback 
     */
    regValidateAfter(callback) {
        // this.rules.on = 

        return this;
    }

}

//注册内部函数 用于调用链式函数
let actionNames = [
    ...propsNames,
    ...fieldNames
];
actionNames.forEach((name) => {

    Maker.prototype[name] = function (val) {
        this.rules[name] = val;
        return this;
    }
})


/**
 * 代理调用maker类
 * 
 *
 * 
 */
class MakerCall {

    type(type) {
        let obj = new Maker(type)
        console.log(obj)
        return obj;
    }


}

/**
 * 生成内置组件的调用函数
 * 
 * @已知问题 目前没有考虑 引入其他组件库 例如iview的使用
 * 
 */
for (let x in builtIn) {

    let label = x;
    let uiLabel = builtIn[x]

    /**
     * 
     * @param name 字段名
     * @param field 绑定data的字段
     * @param value 值
     * 
     * @return {Maker}
     */
    MakerCall.prototype[label] = function (title, field, value) {
        console.log(title, field, value)
        return new Maker(uiLabel).title(title).field(field).value(value);
    }
}



export default new MakerCall();

