/**
 * 编辑功能控制中心
 * 
 * 
 */
class Control {

    constructor() {
        //核心控制的实例关联
        this.main = null;
        this.canvas = null;
        this.render = null;

    }

    /**
     * 当rules更新时主动触发
     * 
     * @todo 刷新操作
     * 
     * @return {null}
     */
    triggerUpdate() {

    }

    $forceUpdate(){
        this.render && this.render.$forceUpdate();
    }

    /**
     * 获取当前选中的节点
     * 
     * 
     * 
     * 
     * @return {VueJson | null}
     */
    getSelected() {

        return this.render ?
            this.render.activityRule : null;
    }

    /**
     * 获取tree结构的parent
     * @logic 目前没有在VueJson上定义它的parent, 暂时通过遍历的方式获取
     * @return {VueJson | null}
     * 
     */
    getParent(child) {
        let rules = this.canvas.rules;

        /**
         * 遍历数组并递归遍历child
         * 
         * @param {Array} nowEl 
         * @param {VueJson} childInfo
         * 
         * @return {VueJsonParentResult} 父级节点 
         */
        let findChild = (nowEl, childInfo) => {
            console.log('findChild', nowEl, childInfo)
            if (typeof nowEl != 'object') {
                console.log('!obj', nowEl)
                return null;
            }
            for (let index = 0; index < nowEl.length; index++) {
                const element = nowEl[index];
                if (element === childInfo) {
                    return {
                        arr: nowEl,
                        index: index,
                    }
                }
                //childs
                if (element.children) {
                    let res = findChild(element.children, childInfo);
                    if (res) {
                        return res;
                    }
                }
            }
            return null;
        }

        return findChild(rules, child);
    }


}
export default Control;

