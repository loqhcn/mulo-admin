/**
 * 客户端控制函数
 * 
 * 
 */
class ClClient {

    constructor() {
        this.watchUpdate = {};
    }
    /**
     * 监听一个更新
     * 
     * @param {String | Number} viewId 视图id
     * @param {Function} action 更新事件
     * @param {Int} cid 组件唯一id,在每次组件创建时生成
     * @return index
     */
    regOnUpdate(viewId, action, cid) {
        console.log('regOnUpdate', viewId, cid)
        if (!this.watchUpdate[viewId]) {
            this.watchUpdate[viewId] = [];
        }
        this.watchUpdate[viewId].push({
            cid: cid || 0,
            action: action
        });
    }

    /**
     * 组件销毁移除事件
     * 
     * @return {bool} 是否移除了事件
     */
    removeOnUpdate(viewId, cid) {
        if (!this.watchUpdate[viewId]) {
            console.log('事件不存在')
            return;
        }
        //移除的事件
        let removeIndex = -1;
        for (let index = 0; index < this.watchUpdate[viewId].length; index++) {
            let el = this.watchUpdate[viewId][index];
            if (el.cid == cid) {
                removeIndex = cid;
            }
        }
        //移除事件
        if (removeIndex != -1) {
            this.watchUpdate[viewId].splice(removeIndex, 1)
            return true;
        }
        return false;
    }

    /**
     * 触发更新
     * @todo 更新了view时, 使用了这个view的子组件都重新渲染
     * @param {String | Number} viewId 视图id
     * @param {ClView} view 模板数据
     * @return null
     */
    triggerUpdated(viewId, view) {
        let actions = this.watchUpdate[viewId] || [];
        actions.forEach((el) => {
          
            el && el.action && el.action(view);
        })
    }
}

export default ClClient