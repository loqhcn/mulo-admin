<template>
  <div>
    属性调整面板
    <div>
      <input type="text" />

      
    </div>
  </div>
</template>

<script>
export default {
    props: {
        rule: {
            type:Object ,
            default: ()=>{
                return []
            }
        },
        //可以编辑的项目
        edits:{
          
        }
    },
    methods: {
        name() {
            
        }
    },
};
</script>

<style lang="scss" scoped>

</style>