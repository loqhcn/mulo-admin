import Vue from 'vue'

import { compile, compileToFunctions, ssrCompileToFunctions } from 'vue-template-compiler'
import { isString, isType } from "./../util";

export default class FormCreateRender {

    constructor(vm) {
        this.vm = vm
    }


    render() {
        let h = this.vm.$createElement;
        let rule = this.vm.rules;


        const vn = compileToFunctions('<el-button><div>123123444</div></el-button>').render.call(this.vm);
        console.log(vn)


        //@ts-ignore

        if (isType(rule, 'Function')) {
            rule = (rule).call(this.vm);
        }

        let data = Array.isArray(rule) ? this.vm.$createElement('div', {}, rule.map(rule => {
            return this.renderRule(rule);
        })) : this.renderRule(rule);
        console.log(data)

        // 渲染组件规则
        return data
    }


    renderRule(rule) {
        if (rule.type === "template" && rule.template) {
            return this.renderTemplate(rule);
        } else {
            const children = this.renderChildren(rule.children || []);
            console.log(rule.type, getProps(rule))
            return this.vm.$createElement(rule.type, getProps(rule), children);
        }
    }

    renderChildren(rule) {
        return rule.map(child => isString(child) ? child : this.renderRule(child));
    }
    renderTemplate(rule) {
        // if (Vue.compile === undefined) {
        //     console.error("使用的 Vue 版本不支持 compile");
        //     return [];
        // }

        if (!rule.vm) rule.vm = new Vue();

        setTemplateProps(rule);

        //@ts-ignore
        const vn = compileToFunctions(rule.template).render.call(rule.vm);

        return vn;
    }

}






const propsName = ['class', 'style', 'attrs', 'props', 'domProps', 'on', 'nativeOn', 'directives', 'scopedSlots', 'slot', 'ref', 'key'];
//获取标签的参数
function getProps(rule) {
    const props = {};
    propsName.forEach(name => {
        if (rule[name] !== undefined)
            props[name] = rule[name];
    });
    console.log(props,rule);
    return props;
}

function setTemplateProps(rule) {
    if (!rule.vm.$props || !rule.props) return;

    const keys = Object.keys(rule.vm.$props);
    keys.forEach(key => {
        if (rule.props[key] !== undefined) rule.vm.$props[key] = rule.props[key];
    });
}