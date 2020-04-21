export default {
   name:'pagination',
   props: {
    pageSize: {
        type: Number,
        default: 10
      },
      small: Boolean,

    total: Number,

    pageCount: Number,
    currentPage: {
        type: Number,
        default: 1
    },
   },   
   render(h){
    return <div>
        分页
    </div>
   }
    
}