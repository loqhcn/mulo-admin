export default {
    data() {
        return {
           row:{
               name:'罗戚洪'
           }
        }
    },
    render(h) {
        // return <div>阿斯蒂芬</div>
        var _vm = this
        var _h = _vm.$createElement
        var _c = _vm._self._c || _h

        return _c(
            "div",
            [
              _c("input", {
                attrs: { type: "text", value: "" },
                model: {
                  value: _vm.row.name,
                  callback: function($$v) {
                    _vm.$set(_vm.row, "name", $$v)
                  },
                  expression: "row.name"
                }
              }),
              _c("div", {}, [_vm._v(_vm._s(_vm.row.name))]),
              _c("button", {
                attrs: { type: "default" },
                on: {
                  click: function($event) {
                    arguments[0] = $event = _vm.$handleEvent($event)
                    _vm.submit.apply(void 0, arguments)
                  }
                }
              })
            ],
            1
          )

    },
}