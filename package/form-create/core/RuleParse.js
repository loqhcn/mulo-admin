
import {
    getType
} from './../../utils/util'

/**
 * 表单配置规则生成为 jsonvue的规则(由jsonvue转换为vnode后呈现)
 * 
 * 
 */
export default class RuleParse {

    constructor(vm) {
        this.vm = vm;
        // # 内置组件规则
        this.builtIn = {
            modal: 'el-dialog',
            button: 'el-button',
            icon: 'i',
            slider: 'el-slider',
            rate: 'el-rate',
            upload: 'fc-elm-upload',
            cascader: 'el-cascader',
            colorPicker: 'el-color-picker',
            timePicker: 'el-time-picker',
            datePicker: 'el-date-picker',
            'switch': 'el-switch',
            select: 'fc-elm-select',
            checkbox: 'fc-elm-checkbox',
            radio: 'fc-elm-radio',
            inputNumber: 'el-input-number',
            input: 'el-input',
            formItem: 'el-form-Item',
            form: 'el-form',
            frame: 'fc-elm-frame',
            col: 'el-col',
            row: 'el-row',
            tree: 'fc-elm-tree',
            autoComplete: 'el-autocomplete',
            group: 'fc-elm-group',
        }

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
        let $rules = [];
        rules.forEach((li, index) => {
            $rules.push(
                this.getFormField(li)
            )
        });

        //底部按钮

        let footer = this.footerRule()

        $rules.push(footer)


        //表单
        let form = this.buildForm($rules)
        return form
    }




    /**
     * 生成表单字段
     * 
     * @param {Object} 目前仅支持单个字段 
     * 
     * @return FieldRule el-form-item
     */
    getFormField(rule) {
        console.log('getform', rule);
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
                { required: true, message: "请输入goods_name", trigger: "blur" }
            ],
            //类名
            className: 'mulo',
            // 字段设置
            fieldSetting: {

            },

        }

        //规则
        let li = rule;
        let $on = this.getActions(li.on);
        let $field = {
            type: this.getFieldType(li.type),
            class: li.class,
            style: li.style,
            attrs: li.attrs,
            props: li.props,
            domProps: {
                // value: this.row.name,
            },
            props: li.props,
            nativeOn: li.nativeOn,
            directives: li.directives,
            scopedSlots: li.scopedSlots,
            slot: li.slot,
            key: li.key,
            ref: li.ref,
            refInFor: li.refInFor,
            on: {
                //设置的其它事件不做中间处理
                ...$on,
                input(e) {
                    console.log(e)
                    //触发原本事件
                    li.on && li.on.input && li.on.input(e);
                    //事件冒泡阻止
                    event.stopPropagation()

                },
                change(e) {
                    //触发原本事件
                    li.on && li.on.change && li.on.change(e);
                    //事件冒泡阻止
                    event.stopPropagation()
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