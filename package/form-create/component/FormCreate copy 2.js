import FormCreateRender from './formCreateRender'
export default {
    name: 'form-create',
    props: ['value'],
  
    render: function (createElement) {
        var self = this
        return createElement('input', {
            domProps: {
                value: self.value.name
            },
            on: {
                input: function (event) {
                    console.log(event)
                    self.$emit('input', event.target.value)
                }
            }
        })
    }



}

