class RulesSetting {

    constructor() {
        this.rules = {
            //筛选框
            filters: {
                //传输到接口的字段名
                paramName: 'filters',

            },
            
        }
    }

    getRules() {
        return this.rules;
    }
}

export default new RulesSetting(); 