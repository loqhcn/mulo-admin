## 实现逻辑

- 通过json生成vnode
- vnode 是vue底层的dom编译后的结构
- jsonvue 通过json和json的嵌套关系树,通过vm.$createElement('tag',{},children) ,生成vnode
- FormCreateRule 生成表单字段的规则
- maker 通过链式函数 生成 FormCreateRule
- 显示表单? FormCreateRule嵌套进表单的jsonvue得到整个表单的jsonvue


## 问题

### 追加字段重新编译后原来的vnode失效了?

rule使用函数返回目前没有问题;

### 没有hidden?

数据驱动的模式, 不做hidden组件实现;

### 没有缓存

目前每个变量更新都会重新渲染整个dom, 没有对组件的渲染进行缓存;


## v-model数据双向绑定



