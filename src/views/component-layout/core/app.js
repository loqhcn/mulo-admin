import Vue from 'vue'
import buildTemplate from './../compile/buildTemplate'
import { compile, compileToFunctions, ssrCompileToFunctions } from 'vue-template-compiler'


/**
 * 应用端服务
 * 
 * @logic 提供组件转义 ,服务创建 
 * 
 */
class App {
    constructor() {
        //每个注册的组件分配id
        this.cid = 0;
    }

    /**
     * 构建组件
     * 
     * @param {*} component 
     * @param {*} viewId
     * 
     * @return VueComponent
     */
    getComponent(clComponent, viewId) {
        var _this = this;
        let clViewComponent = {
            data() {
                return {
                    viewId: viewId,
                    views: false,
                    cid: 0,
                    flush: 0,
                }
            },
            watch: {
                views: {
                    deep: true,
                    handler: (newValue, oldValue) => {
                        console.log('$views', newValue)
                    }
                }
            },
            created() {
                /**
                 * 注册更新事件
                 * @param {ClView} view 视图内容
                 * @todo 重新渲染组件
                 */
                let updateAction = (view) => {
                    console.log('触发view更新事件', view);
                    this.renderInit();
                }
                
                this.$cl.regOnUpdate(this.viewId, updateAction, this._uid);
                updateAction();
            },
            methods: {
                renderInit() {
                    this.flush++;
                    this.$nextTick(() => {
                        console.log(typeof clComponent)
                        console.log(Object.prototype.toString.call(clComponent))
                        let render = (component) => {
                            //view数据
                            console.log('views-now', JSON.stringify(this.$views))
                            console.log('views', this.$views);
                            console.log('viewId', viewId);

                            let view = this.$views[viewId] || [{ type: 'div', children: ['默认内容'] }];
                            console.log('view', view);
                            let templateStr = buildTemplate(view);

                            //dom转换为字符串
                            let tmpNode = document.createElement('div')
                            tmpNode.appendChild(templateStr)
                            let str = tmpNode.innerHTML
                            console.log('str', str);

                            //编译
                            let data = compileToFunctions(str);
                            console.log('data', data);

                            //渲染
                            console.log('component', component);
                            component.render = data.render;
                            component.staticRenderFns = data.staticRenderFns;

                            //生成组件
                            let MyComponent = new Vue(component)
                            var vm = MyComponent.$mount();
                            //@bug 使用这种方式不会跟新, new出来的对象是之前的
                            // let MyComponent =  Vue.extend(component)
                            // var vm = new MyComponent().$mount()

                            console.log(vm.$el)
                            // data.render.call( new Vue )
                            this.$refs.view.innerHTML = ''
                            this.$refs.view.appendChild(vm.$el);
                        }
                        
                        if (typeof clComponent == 'function') {
                            //webpack异步加载
                            clComponent.call(this).then(c => {
                                console.log('c', c)
                                render(c.default);
                            })
                        } else {
                            render(clComponent);
                        }

                        // let MyComponent = (typeof clComponent == 'function') ? Vue.extend(clComponent()) : 
                    })

                }
            },
            render(h) {
                return <div ref="view" id="clmain">罗戚洪</div>
            },
        }
        return clViewComponent
    }

    /**
     * 编译为可视化组件
     * 
     * @return {ClCompoent} 可视化更新的组件
     */
    parseComponent(clComponents) {
        let components = {}
        for (var index in clComponents) {
            const li = clComponents[index];
            let {
                viewId, component
            } = li
            components[index] = Vue.extend(this.getComponent(component, viewId))
        }
        return components
    }

}

let app = false;
if (!app) {
    app = new App();
}
export default app;
