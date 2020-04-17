[TOC]

## 通用配置规则
```javascript
{
    // 类型
    type:'input',
    // 筛选 提交的字段
    field:'search',
    // 筛选字段标题
    title:'字段标题',
    //这个上面加一个类名
    className:'item上',
    
}
```

## demo

```javascript
let rules  = {
        //每个筛选字段自动注入css类名,名字为 field ,便于控制定位
        joinClass:false,
        className:"",
          // 输入框筛选
          {
            type: "input",
            attr: {
              type: "number"
            },
            field: "name",
            title: "名称"
          },
          // select框筛选
          {
            type: "select",
            field: "status",
            title: "状态",
            selects: [
              { key: -1, value: "请选择" },
              { key: 0, value: "下架" },
              { key: 1, value: "正常" }
            ]
          },

          // 时间日期范围筛选
          {
            type: "datetimerange",
            field: "addtime",
            title: "添加时间"
          },

          //时间范围筛选
          {
            type: "timerange",
            field: "jobtime",
            title: "上班时间"
          },

          //多选筛选 checkboxgroup
          {
            type: "checkboxgroup",
            field: "statusselect",
            title: "状态筛选"
            // options: [
            //   { value: "1" },
            //   { value: "2" },
            //   { value: "3" },
            //   { value: "4" },
            //   { value: "5" },
            //   { value: "6" },
            //   { value: "7" }
            // ]
          },

          // 数值范围
          {
            type: "numberrange",
            field: "numberrange",
            title: "商品成本价",
            placeholders: ["最低", "最高"]
          }
}

```
## input 输入框

## select 下拉选择

## timerange 时间范围

## datetimerange 日期时间范围

## numberrange 数值范围

## checkboxgroup 状态选择
```
          //多选筛选 checkboxgroup
          {
            type: "checkboxgroup",
            field: "statusselect",
            title: "状态筛选"
            // options: [
            //   { value: "1" },
            //   { value: "2" },
            //   { value: "3" },
            //   { value: "4" },
            //   { value: "5" },
            //   { value: "6" },
            //   { value: "7" }
            // ]
          },
```
# 布局规则

