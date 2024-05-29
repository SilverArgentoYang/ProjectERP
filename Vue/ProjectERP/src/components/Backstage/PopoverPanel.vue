<script setup>
import { inject } from 'vue';


    //inject
    const store = inject('store');

    const props = defineProps({
        inputs:{
            type:Array,
            defualt:[{
                type:'text',
                text:'Undefind',
                defualtvalue:''
            }]
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
        <div class="inputbox" v-for="item,index in inputs">
            <div class="text">{{item.text}}:</div>
            <input class="input" v-if="item.type=='text'">
            <textarea class="input" v-if="item.type=='texteara'" rows="4"/>
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
        min-width:80px;
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
        padding: 5px 10px;
        box-sizing: border-box;
        resize: none;
    }
    .inputbox>.input:focus {
        outline: none;
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
    @media only screen and (max-width: 1680px) {
        .popoverbody {
            width: 500rem;
            box-shadow: 0 0 10rem var(--shadowblack);
            border-radius: 15rem;
            padding: 15rem 15rem;
        }
        .title {
            border-radius: 15rem;
            font-size: 18rem;
        }

        .inputbox {
            margin-top: 20rem;
            gap: 5rem;
        }
        .inputbox>.text {
            height: 30rem;
            font-size: 16rem;
            line-height: 30rem;
        }
        .inputbox>.input {
            min-height: 30rem;
            border-radius: 7rem;
            font-size: 16rem;
            padding: 0 10rem;
        }
        
        .command {
            margin-top: 30rem;
            gap: 5rem;
        }
        .commandbutton {
            padding: 0 25rem;
            height: 35rem;
            border-radius: 5rem;
            font-size: 16rem;
            line-height: 35rem;
        }
    }
</style>