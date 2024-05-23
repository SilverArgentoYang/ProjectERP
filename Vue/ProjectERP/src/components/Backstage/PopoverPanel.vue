<script setup>
import { inject } from 'vue';


    //inject
    const store = inject('store');

    const props = defineProps({
        input:{
            type:Number,
            defualt:1
        },
        posturl:{
            type:String,
            defualt:''
        }
    });
    
    //确认
    function _confirm() {
        store._backstage_popovershow(false);
    }
    //取消
    function _cancel() {
        store._backstage_popovershow(false);
    }
</script>

<template>
    <div class="popoverbody">
        <div class="title"><slot name="title"></slot></div>
        <div class="inputbox" v-for="item,index in input">
            <div class="text"><slot :name="'text'+index"></slot></div>
            <div class="input"><slot :name="'input'+index"></slot></div>
        </div>
        <div class="command">
            <div class="commandbutton button confirm" @click="_confirm()">确认</div>
            <div class="commandbutton button cancel" @click="_cancel()">取消</div>
        </div>
    </div>
</template>
    
<style scoped>
    .popoverbody {
        width: 500px;
        box-shadow: 0 0 10px var(--shadowblack);
        border-radius: 15px;
        padding: 15px 15px;
    }
    .title {
        width: 100%;
        border-radius: 15px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
    }

    .inputbox {
        width: 100%;
        margin-top: 20px;
        display: flex;
        gap: 5px;
    }
    .inputbox>.text {
        height: 30px;
        font-size: 16px;
        line-height: 30px;
    }
    .inputbox>.input {
        min-height: 30px;
        flex: 1;
        border-radius: 7px;
        border: 1px solid var(--colorldgrey);
        font-size: 16px;
        padding: 0 10px;
        box-sizing: border-box;
    }
    
    .command {
        width: 100%;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .commandbutton {
        flex: 1;
        padding: 0 25px;
        height: 35px;
        background-color: var(--colorblue);
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        color: var(--colorwhite);
        text-align: center;
        line-height: 35px;
    }
</style>