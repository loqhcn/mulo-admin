


/**
 * 生成 
 * @todo 注入操作控制, 自由变换, 拖动 等等功能的一个容器
 * 
 * 
 */


export default class RuleParse {

    /**
     * @param {Function} flush 内部事件绑定刷新了rules 回调进行刷新
     * 
     */
    constructor(vm) {
        // 操作控制容器
        this.contaier = {
            type: 'cl-container'
        }

        this.vm = vm;

        //id分配计数器
        this.idCount = 0;
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
            if (typeof element == 'string') {
                continue;
            }

            let $element = $rules[x];



            //dom渲染
            element = Object.assign(element, {

                on: {
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

                    }


                }

            })





            //本体的子元素渲染
            if ($element.children) {
                element.children = this.parseContainer(element.children, $element.children, ++level);
            }

            //操作控制容器

            rules[x] = {
                type: this.contaier.type,
                props: {
                    vm: this.vm,
                    $element: $element,
                    active: $rules[x].operation,
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