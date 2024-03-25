<script setup>
import { useRouter } from 'vue-router';

    //import
    const router = useRouter();
    //传值导入
    const props = defineProps({
        good : {
            type:Object,
            default:{
                id:'',
                img:"",
                realprice:"0.00",
                fakeprice:"0.00",
                name:"notfound"
            }
        }
    });

    //跳转详情页
    function _jumptodetial(goodid){
        router.push({
            name:'Detial',
            params:{
                goodid:goodid
            }
        });
    }
</script>

<template>
    <div class="Itembody button" @click="_jumptodetial(good.id)">
        <img :src="good.img" alt="" class="img">
        <div class="price">
            <div class="realprice">￥{{good.realprice}}</div>
            <div class="fakeprice">￥{{good.fakeprice}}</div>
        </div>
        <div class="name">{{good.name}}</div>
    </div>
</template>

<style scoped>
    .Itembody {
        width: 320px;
        height: 270px;
    }

    .img {
        width: 320px;
        height: 180px;
        border-radius: 15px;
        object-fit:cover;
    }

    .price {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
    }
    .realprice {
        float: left;
        color: var(--colorred);
    }
    .fakeprice {
        float: right;
        color: var(--colorgrey);
        text-decoration: line-through;
    }

    .name {
        height: 50px;
        font-size: 15px;
        line-height: 25px;
        color: var(--colordgrey);
        text-align: justify;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
</style>