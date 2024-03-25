<script setup>
    //VUE引用
    import { inject, ref } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    const router = useRouter();

    // components
    import GoodsItem from './../GoodsItem.vue'

    //读取轮播图
    const rowpapergoods = ref([
        {
            id:"",
            img:"",
            fakeprice:"Undefined",
            realprice:"Undefined",
            name : "Undefined"
        }
    ]);
    axios({
        url:'/goods',
        method:'get',
        params:{
            type:'rowpapergoods'
        }
    }).then((res)=>{
        rowpapergoods.value = res.data.goods.slice();
    });

    //读取推荐商品
    const suggestgoods = ref([
        {
            id:"",
            img:"",
            fakeprice:"Undefined",
            realprice:"Undefined",
            name : "Undefined"
        }
    ]);
    axios({
        url:'/goods',
        method:'get',
        params:{
            type:'suggestsixgoods'
        }
    }).then((res)=>{
        suggestgoods.value = res.data.goods.slice();
    });

    //读取所有商品
    const goods = ref([
        {
            id:"",
            img:"",
            fakeprice:"Undefined",
            realprice:"Undefined",
            name : "Undefined"
        }
    ]);
    axios({
        url:'/goods',
        method:'get',
        params:{
            type:'goods'
        }
    }).then(res => {
        goods.value = res.data.goods.slice();
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
    <div class="homepagebody">
        <!-- 上半部分 -->
        <div class="special">

            <!-- 轮播图 -->
            <div class="rowpaper">
                <div class="rowpapercontain">
                    <img class="img button"
                        v-for="item in rowpapergoods"
                        :src="item.img" alt=""
                        @click="_jumptodetial(item.id)
                    ">
                </div>
            </div>

            <!-- 推荐内容 -->
            <div class="famous">
                <GoodsItem v-for="item in suggestgoods" :good="item" class="famousitem"></GoodsItem>
            </div>
        </div>

        <!-- 下半部分 -->
        <div class="normal">
            <GoodsItem v-for="item in goods" :good="item" class="normalitem"></GoodsItem>
        </div>
    </div>
</template>

<style scoped>
    @import url(../../../css/HomePage.css);
</style>