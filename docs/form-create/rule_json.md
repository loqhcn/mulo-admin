# 生成表单列

## 输入规则 

```json
{
    type:"input",
    title:"商品名称",
    field:"goods_name",
    value:"iphone 7",
    col:{
    	span:12,
    	labelWidth:150
    },
    props: {
        "type": "text",
    },
    validate:[
        { required: true, message: '请输入goods_name', trigger: 'blur' },
    ],

}
```

## 实际生成规则

```json

{
    type:'div'
}

```

## maker函数