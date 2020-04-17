var components
var render = function () {
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
                    callback: function ($$v) {
                        _vm.$set(_vm.row, "name", $$v)
                    },
                    expression: "row.name"
                }
            }),
            _c("div", {}, [_vm._v(_vm._s(_vm.row.name))]),
            _c("button", {
                attrs: { type: "default" },
                on: {
                    click: function ($event) {
                        arguments[0] = $event = _vm.$handleEvent($event)
                        _vm.submit.apply(void 0, arguments)
                    }
                }
            })
        ],
        1
    )
}

var data = ()=>{
    return {
        row: {
            name: "罗戚洪",
            name2: "mulo"
        }
    }
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true

export default { render, data, staticRenderFns, recyclableRender, components }