


/**
 * 生成 
 * @todo 注入操作控制, 自由变换, 拖动 等等功能的一个容器
 * 
 * 
 */

import defaultUi from './../ui/default'

export default class RuleParse {

    /**
     * @param {Function} flush 内部事件绑定刷新了rules 回调进行刷新
     * 
     */
    constructor(vm) {
        // 操作控制容器
        this.contaier = {
            type: 'cl-container',
            extendStyle: [
                'display',
            ]
        }


        this.vm = vm;

        //id分配计数器
        this.idCount = 0;
        //建立id和rule的对照关系
        this.idsMap = {

        }

        //组件关系 , 缺陷: 目前只索引了default, 计划后期实现更多ui库和自定义库载入
        this.componentsList = {}
        let uis = [
            defaultUi
        ]
        uis.forEach((ui) => {
            ui.forEach((cate) => {
                cate.children.forEach((component) => {
                    this.componentsList[component.id] = component;
                })
            })
        })



    }

    /**
     * 分配一个组件id
     * 
     */
    nextId() {
        return this.idCount++;

    }

    getContainerStyle(style) {
        let $style = {};
        for (let x in this.contaier.extendStyle) {
            let key = this.contaier.extendStyle[x];
            if (style && style[key] != undefined) {
                $style[key] = style[key]
            }
        }
        return $style;
    }


    /**
     * 转换rules
     * @param {*} $rules 
     * 
     * @return vuejson
     */
    parse($rules) {
        console.log('parse todo ');

        let rules = JSON.parse(JSON.stringify($rules));

        this.rules = $rules;

        //注入操作容器和事件
        let $rulesCode = this.parseContainer(rules, $rules);

        return $rulesCode;
    }


    /**
     * 规则中的容器类处理
     * 
     * @param {Array} rules 复制的规则, 控制整个操作逻辑
     * @param {Array} $rules 规则本体 防止注入的层级和事件`污染`原规则
     * @param {Number} level 递归渲染层级
     *
     * @logic 区分本体和复制规则 , 因为真正渲染的规则中需要注入 一层 用于加事件 , $rules负责控制数据和渲染, rules控制操作
     * 
     * @return vuejson
     */
    parseContainer(rules, $rules, level) {
        level = level || 0
        let _this = this;

        for (let x in rules) {


            let element = rules[x]
            //普通文字
            if (typeof element == 'string') {
                continue;
            }

            let $element = $rules[x];

            //dom渲染
            element = Object.assign(element, {

                on: {

                    //拖动组件落下
                    drop: (e) => {

                        var data = JSON.parse(e.dataTransfer.getData("text/plain"));
                        let { row } = data;

                        console.log('container', level, row);

                        //加入子元素
                        $rules[x].children = $rules[x].children || [];
                        $rules[x].children.push({
                            ...row
                        })

                        e.preventDefault();
                        e.stopPropagation()

                        //刷新 dom 
                        this.vm._refresh.call(this.vm, this.rules)

                    },
                    keyup:(e)=>{
                        console.log(e.keyCode)
                    }


                }


            })





            //本体的子元素渲染
            if ($element.children) {
                element.children = this.parseContainer(element.children, $element.children, ++level);
            }

            // # 容器

            // ## 实现外面加一层div不影响定位

            // 容器继承的style


            //加入到层级
            $rules[x].operation = $rules[x].operation || {};
            //分配id
            $rules[x].operation.id = $rules[x].operation.id || this.nextId()
            if (this.idsMap[$rules[x].operation.id] == undefined) {
                this.idsMap[$rules[x].operation.id] = $element
            }
            rules[x] = {
                type: this.contaier.type,
                style: this.getContainerStyle(element.style || {}),
                props: {
                    id: $rules[x].operation.id,
                    vm: this.vm,
                    $element: $element,
                    active: $rules[x].operation.id == this.vm.activeId,
                    componentRule: this.componentsList[$element.id]
                },
                children: [
                    element
                ],
                on: {
                    active: () => {
                        console.log('on active')

                        //活动
                        $rules[x].operation = Object.assign($rules[x].operation || {}, {
                            active: true
                        })

                    }
                }
            }

        }
        return rules;
    }



}