/**
 * 开发基础组件拖动布局
 * 
 * 
 */
export default [
    {
        title: "布局",
        children: [
            {
                type: "div",
                attrs: {
                    class: "cl-container"
                },
                title: "Div容器",
                icon: "",
                containerSetting: {
                    // 1代表这是一个容器类型
                    status: 1,
                    type: "cl-container"
                }
            }

        ]
    },
    {
        title: "基础",
        children: [
            {
                type: "button",
                title: "Button",
                icon: "",
                attrs: {
                    class: "btn"
                },
                children: ["Button"]
            }
        ]
    },
    {
        title: "饿了么组件",
        children: [
            {
                type: "el-button",
                title: "Button按钮",
                icon: "",
                attrs: {

                },
                children: ["Button"]
            },
            {
                type: "el-tag",
                title: "Tag标签",
                icon: "",
                attrs: {

                },
                children: ["标签一"]
            },
            {
                type: "el-image",
                title: "图片",
                icon: "",
                style:{
                    width:'100px',
                    height:'100px'
                },
                props: {
                    src: '/static/img/1.jpg'
                },
                attrs: {

                },
                children: ["标签一"]
            }
        ]
    },

    {
        title: "表达设计器",
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
    },
    {
        title: "bootstrap栅格布局",
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