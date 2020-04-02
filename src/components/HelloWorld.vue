<template>
    <div class="hello">
        <div>sotre token: {{ msg }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
    @Prop({ default: "default value" })
    private msg!: string;

    @Watch("child")
    private onChildChanged(val: string, oldVal: string) {
        console.log(val, oldVal);
    }
}
</script>

<style scoped lang="less">
.hello {
    font-size: 36px;
    text-align: center;
}
</style>
