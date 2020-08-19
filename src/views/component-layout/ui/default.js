import maker from './../../../../package/src/form-create/factory/maker'



/**
 * 开发基础组件拖动布局
 * 
 * @rule 每个组件的配置本体是vuejson,额外的参数用于控制 其它操作,数据存储,显示
 * 
 */
export default [
    {
        title: "布局",
        name: 'layout',
        children: [

            {
                //容器id,用于索引组件类型  命名规范:库分类.组件分类.组件名
                id: 'default.layout.div',
                //组件
                type: "div",
                //参数
                attrs: {
                    class: "cl-container"
                },
                //名称
                title: "Div容器",
                //图标
                icon: "",
                //容器设置 ?如果它是一个容器
                containerSetting: {
                    // 1代表这是一个容器类型
                    status: 1,
                    type: "cl-container"
                },
                /**
                 * 属性编辑规则
                 * 
                 * @logic 通过maker的属性设置监听更新事件, 更新后刷新可视化编辑的属性
                 * @param row 当前组件
                 * 
                 * @return rules
                 */
                renderAttributeEdit: (element) => {
                    
                    // 属性编辑组件
                    return [
                        maker.input('宽', 'style.width', '100px').on({
                            input:(e)=>{
                                //更新rule
                                element.style = Object.assign(
                                    ( element.style || {} ),
                                    {
                                        width:e
                                    }
                                )

                                console.log('宽度更新',element)

                            }
                        }),
                        maker.input('高', 'style.height', '100px'),
                        
                    ]
                    
                },


                /**
                 * 存储数据和vnode属性的映射关系
                 * 
                 * @logic 编辑后渲染 
                 * - 读取数据, 如props.name
                 * - 
                 * 
                 */
                renderAttributeRule(){

                    return {
                        'class':'class',
                        //按钮文字
                        'children':'text',
                        'width':'style.width',
                           
                    }
                    

                },
                



            }

        ]
    },
    {
        title: "基础",
        name: 'default',
        children: [
            {
                id: 'default.default.btn',
                type: "button",
                title: "Button",
                icon: "",
                style: {
                    display: 'inline-block'
                },
                attrs: {
                    class: "btn"
                },
                children: ["Button"]
            },
            {
                id: 'default.default.input',
                type: "input",
                title: "Input",
                icon: "",
                style: {
                  
                },
                attrs: {
                    class: "input"
                },
                children: []
            }
        ]
    },
    {
        title: "饿了么组件",
        name: 'elementui',
        children: [
            {
                type: "el-button",
                title: "Button按钮",
                icon: "",
                style: {
                    display: 'inline-block'
                },
                attrs: {

                },
                children: ["Button"]
            },
            {
                type: "el-tag",
                title: "Tag标签",
                icon: "",
                style: {
                    display: 'inline-block'
                },
                attrs: {

                },
                children: ["标签一"]
            },
            {
                id:'default.elementui.el-image',
                type: "el-image",
                title: "图片",

                icon: "",
                style: {
                    display: 'inline-block',
                    width: '100px',
                    height: '100px'
                },
                props: {
                    src: '/static/img/1.jpg'
                },
                attrs: {
                    
                },
                children: ["标签一"],
                renderAttributeEdit:(element)=>{
                   return [
                        maker.input('图片链接', 'src', '/static/img/1.jpg'),
                   ]
                }
            }
        ]
    },
    {
        title: "bootstrap栅格布局",
        name: 'bootstrap',
        children: [
            {
                type: "div",
                title: "Div.container",
                class: ["container"],
                icon: ""
            },
            {
                type: "div",
                title: "Div.row",
                class: ["col"],
                icon: ""
            },
            {
                type: "div",
                title: "Div.col",
                icon: ""
            }
        ]
    }
]