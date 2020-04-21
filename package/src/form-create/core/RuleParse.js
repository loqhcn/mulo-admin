
import {
    getType
} from './../../../utils/util'

import { builtIn } from './../ui/element/rule'

/**
 * 表单配置规则生成为 jsonvue的规则(由jsonvue转换为vnode后呈现)
 * 
 * 
 */
export default class RuleParse {

    constructor(vm) {
        this.vm = vm;
        // # 内置组件规则
        this.builtIn = builtIn

        this.formContainer = {
            type: 'div'
        }

        this.formBody = {
            type: 'el-form'
        }


        this.formRow = {
            type: 'el-form-item'
        }

        // 操作配置

    }

    //获取实际组件名称如 input = el-input
    getFieldType(name) {
        return this.builtIn[name] !== undefined ? this.builtIn[name] : name;
    }

    /**
     * 配置规则生成表单规则
     * 
     * @param rule 标准表单创建规则
     * 
     * @return 完整功能配置
     */
    parse(rules) {
        console.log('编译组件',rules);
        
        let $rules = [];
        rules.forEach((li, index) => {
            
            $rules.push(
                this.getFormField(  li.__ismaker ? li.toJson() : li )
            )
        });

        //底部按钮
        let footer = this.footerRule()
        $rules.push(footer)

        //表单
        let form = this.buildForm($rules)
        // this.vm._refresh()
        return form
    }




    /**
     * 生成表单字段
     * 
     * @param {FormCreateRule} 目前仅支持单个字段 
     * 
     * @return FieldRule el-form-item
     */
    getFormField(rule) {
        
        // console.log('getform', rule);
        //输入规则示例
        let demoRule = {
            type: "input",
            title: rule.title || "title",
            field: rule.field || "name",
            value: rule.value || "",
            // 布局行列
            col: {
                span: 12,
                labelWidth: 150
            },
            // 组件注入参数
            props: {
                type: "text"
            },
            //验证参数
            validate: [
                { required: true, message: "请输入goods_name", trigger: "blur"}
            ],
            //类名
            className: 'mulo',
            // 字段设置
            fieldSetting: {

            },
        }
        let _this = this;
        //规则
        let li = rule;
        let $on = this.getActions(li.on);
        let $fieldName = li.field || 'name';

        // console.log(_this.vm.value[li.field]);

        let $field = {
            type: li.type,
            class: li.class,
            style: li.style,
            attrs: {

            },
            props: {
            },
            domProps: {

            },
            props: li.props,
            nativeOn: li.nativeOn,
            directives: li.directives,
            scopedSlots: li.scopedSlots,
            slot: li.slot,
            key: li.key,
            ref: li.ref,
            refInFor: li.refInFor,
            // 双向绑定
            model: {
                value: this.vm.value[ $fieldName ],
                callback:  ($$v)=>{
                    console.log('model callback',$fieldName,this.vm)

                    this.vm._refresh();
                    this.vm.$set(this.vm.value, $fieldName , $$v)
                },
            },
            on: {
                //设置的其它事件不做中间处理
                ...$on,
                input(e) {
                    console.log('getFormField - on input', e);
                    // _this.vm.value[li.field] = e;
                    // //触发原本事件
                    // li.on && li.on.input && li.on.input(e);
                    // //事件冒泡阻止
                    // event.stopPropagation()

                },
                change(e) {
                    // //触发原本事件
                    // li.on && li.on.change && li.on.change(e);
                    // //事件冒泡阻止
                    // event.stopPropagation()
                }

            }

            //子集

        }

        //表单字段
        let $rule = {
            type: this.formRow.type,
            props: {
                label: rule.title || 'field',
            },
            children: [
                // 表单列
                $field
            ]
        }
        console.log('字段规则',$field);
        return $rule;
    }



    /**
     * 表单所有规则注入到form中
     * 
     * 
     * 
     * @param {Array} fields 
     * 
     * @return {Rule} 完整的json格式的生成规则 
     */
    buildForm(fields) {

        fields = fields || []

        // 表单底部按钮生成
        let form = {
            type: this.formContainer.type,
            ref: "btn0",
            class: "mulo-form",
            props: {

            },
            children: [
                // 表单主体
                {
                    type: this.formBody.type,
                    children: [
                        ...fields
                    ]
                }
            ]
        }
        return form;
    }

    /**
     * 生成底部表单按钮规则
     * 
     * 
     * @return {Rule} 底部按钮规则json
     */
    footerRule() {
        let { type } = this.formRow;
        //默认格式
        let rule = {
            type: type,
            children: [
                {
                    type: this.getFieldType('button'),
                    children: [
                        "提交"
                    ],
                    on: {
                        click: () => {
                            console.log('submit')
                        }
                    }
                },
                {
                    type: this.getFieldType('button'),
                    children: [
                        "取消"
                    ],
                    on: {
                        click: () => {
                            console.log('取消')
                        }
                    }
                }
            ]
        }
        return rule
    }


    /**
     * 通过的rules生成的组件的事件, 通过复写事件的方式实现插入 v-model功能
     * 
     * @param {*} on 
     */
    getActions(on) {

        let $on = {

        }
        if (on) {
            for (let x in on) {
                if (x != 'input' && x != 'change') {
                    $on[x] = on[x]
                }
            }
        }
        return $on;
    }


}