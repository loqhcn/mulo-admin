import { compile, compileToFunctions, ssrCompileToFunctions } from 'vue-template-compiler'

// import {createCompiler} from 'vue/src/compiler/index'

let d = compileToFunctions(
    `
        <div>
            阿斯顿发士大夫
            <div v-if="key" @click="adfasdf">{{msg}}</div>
        </div>
    `
);
console.log(d)

export default {
    data() {
        return {
            key: 1,
            msg: "阿斯顿发士大夫123123"
        }
    },
    methods: {
        click() {
            // let compile = createCompiler();
            let d = compileToFunctions(
                `
                    <div>
                        <div v-if="a">{{msg}}</div>
                    </div>

                `
            );
            console.log(d);
        }
    },
    render: () => {

    },
    created() {
        // let d = compileToFunctions(
        //     `
        //     <div>
        //         阿斯顿发士大夫
        //         <div v-if="key" @click="adfasdf">{{msg}}</div>
        //     </div>

        //     `
        // );
        // this.render = d.render;
        console.log(this)
        this.$forceUpdate();
    },
    render1(h) {
        // let compile = createCompiler();

        let d = compileToFunctions(
            `
            <div>
                阿斯顿发士大夫
                <div v-if="a">{{msg}}</div>
            </div>

            `
        );


        return <div onclick={this.click} >asdf</div>
    },
}