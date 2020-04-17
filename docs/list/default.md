## 基础列表


### 使用



```vue
<template>
  <div style="width:100vw;">
    <mulo-list-default
      :rows="[
          '标题','状态','添加时间','操作'
      ]"
      api="http://admin-tp6.lqh.cn/apis/news/index"
    >
    
      <!-- 列表 -->
      <template v-slot:item="{item}">
        <td>{{item.title}}</td>
        <td>状态</td>
        <td>{{item.addtime}}</td>
        <td>
          <button class="btn">编辑</button>
          <button class="btn">删除</button>
        </td>
      </template>
    </mulo-list-default>

  </div>
</template>

```


### 后台接口示例

- 列表页接口返回格式 须 是这样的格式 , 否则需要进行配置

```json
{
  "code":200,
  "msg":"success",
  "data":{
      "list":[{"name":"这是列表"}],
      "total":13,
      "current_page":1,
      "psize":10
    }
  }
```