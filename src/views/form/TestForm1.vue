<template>
    <div>
        <mulo-form-default>
            <mulo-form-row title="姓名">
                <input type="text" class="form-control">
            </mulo-form-row>
        </mulo-form-default>
    </div>
</template>

<script>
    export default {
        created() {
            
            this.info();
        },
        methods: {
            info() {
                this.$http.post()
            },
            submit(){
                this.$http.post()
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>