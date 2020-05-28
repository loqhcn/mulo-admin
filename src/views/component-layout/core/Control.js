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


}
export default Control;

