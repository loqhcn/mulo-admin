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
        this.contaier = {
            type: 'mulo-cl-box'
        }
        this.vm = vm;
    }


    /**
     * 
     * @param {*} rules 
     */
    parse(rules) {
        console.log('parse todo ');

        this.rules = rules;

        rules = this.parseContainer(rules);

        return rules;
    }


    /**
     * 规则中的容器类处理
     * 
     * @param {*} rules
     *
     * 
     */
    parseContainer(rules, level) {
        level = level || 0

        for (let x in rules) {

            let element = rules[x]

            // 容器的事件
            element = Object.assign(element, {
                on: {
                    drop: (e) => {

                        var data = JSON.parse(e.dataTransfer.getData("text/plain"));
                        let { row } = data;

                        console.log('container', level, row);

                        element.children = [
                            {
                                ...row
                            }
                        ]

                        // ev.preventDefault();
                        e.stopPropagation()

                        this.vm.flushDo( this.rules );

                    }
                }
            })

            if (element.children) {
                element.children = this.parseContainer(element.children, ++level);
            }

        }
        return rules;
    }



}