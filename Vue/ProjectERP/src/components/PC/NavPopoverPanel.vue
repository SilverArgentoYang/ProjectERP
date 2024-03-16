<script setup>
import { inject } from 'vue';
    // components
    import PanelItem from './PanelItem.vue'

    //props导入
    const props = defineProps({
        itemlist:{
            type:Array,
            default:[{
                id:0,
                img:'',
                fakeprice:'Undefined',
                realprice:'Undefined',
                name:'Undefined'
            }]
        }
    });

</script>

<template>
    <div class="popoverpanelbody">
        <!-- 后端重构后需要调整 -->
        <PanelItem v-for="item in itemlist" :item="item"></PanelItem>
    </div>
</template>

<style scoped>
    .popoverpanelbody {
        background-color: var(--colorwhite);
        border-radius: 15px;
        box-shadow: 0 1px 1px var(--shadowblack);
        width: 300px;
        height: 370px;
        overflow-y: scroll;
        padding: 9px 15px;        
        box-sizing: border-box;
    }
    .popoverpanelbody::-webkit-scrollbar {
    display: none;
    }
</style>