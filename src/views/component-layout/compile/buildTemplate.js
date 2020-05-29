import { compile, compileToFunctions, ssrCompileToFunctions } from 'vue-template-compiler'


/**
 * 规则生成模板
 * @param {Array} rules 
 * 
 * @return templateDom 未编译的vue模板源码
 */
export default function buildTemplate(rules) {
    console.log('buildTemplate', rules);
    let el = render(toRoot(rules))
    return el
}


/**
 * vuejson 生成 vuetemplate
 * @logic 通过创建dom生成dom树
 * @param {vuejson} vnode 
 * 
 * @return {dom} vue模板
 */
function render(vnode) {
    if (!vnode) {
        return null;
    }
    // Strings just convert to #text Nodes:
    if (vnode.split) return document.createTextNode(vnode);
    // create a DOM element with the nodeName of our VDOM element:
    let n = document.createElement(vnode.type);
    
    //渲染属性
    
    n.className = vnode.attrs && vnode.attrs.class ? vnode.attrs.class : '';

    // copy attributes onto the new node:
    let a = vnode.attributes || {};
    Object.keys(a).forEach(k => n.setAttribute(k, a[k]));
    // render (build) and then append child nodes:
    (vnode.children || []).forEach(c => n.appendChild(render(c)));
    return n;
}

/**
 * 规则放到div容器中
 * 
 * @param {*} rules
 * @return VueJson
 */
function toRoot(rules) {
    return {
        type: 'div',
        children: rules
    }
}