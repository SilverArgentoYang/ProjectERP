<script setup>
    //VUE引用
    import { inject, ref } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    const router = useRouter();

    //resouce
    const {
        right_arrow,
        left_arrow
    } = inject('resource');

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
        url:'/getGoodsSuggest',
        method:'get',
        params:{
            number:5
        }
    }).then((res)=>{
        rowpapergoods.value.length=0;
        res.data.goods.forEach(item => {
            rowpapergoods.value.push({
                id:item.id,
                img:item.img,
                fakeprice:item.fakeprice,
                realprice:item.realprice,
                name : item.name
            })
        });
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
        url:'/getGoodsSuggest',
        method:'get',
        params:{
            number:6
        }
    }).then((res)=>{
        suggestgoods.value.length=0;
        res.data.goods.forEach(item => {
            suggestgoods.value.push({
                id:item.id,
                img:item.img,
                fakeprice:item.fakeprice,
                realprice:item.realprice,
                name : item.name
            })
        });
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
        url:'/getGoodsMain',
        method:'get'
    }).then(res => {
        goods.value.length=0;
        res.data.goods.forEach(item => {
            goods.value.push({
                id:item.id,
                img:item.img,
                fakeprice:item.fakeprice,
                realprice:item.realprice,
                name : item.name
            })
        });
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

    //轮播图控制
    const rowpapergoing = ref(0);
    const rowpapertimer = ref(5);
    function _rowpaperrow() {
        if(rowpapergoing.value < rowpapergoods.value.length-1) {
            rowpapergoing.value++;
        }else {
            rowpapergoing.value = 0;
        }
        rowpapertimer.value = 5;
    }
    function _rowpaperrowreverse() {
        if(rowpapergoing.value > 0) {
            rowpapergoing.value--;
        }else {
            rowpapergoing.value = rowpapergoods.value.length-1;
        }
        rowpapertimer.value = 5;
    }
    function _changerowpaper(index) {
        rowpapergoing.value = index;
    }
    function _rowpaperauto() {
        if(rowpapergoing.value < rowpapergoods.value.length-1) {
            rowpapergoing.value++;
        }else {
            rowpapergoing.value = 0;
        }
        rowpapertimer.value = 5;
        setTimeout(_rowpaperauto,rowpapertimer.value*1000);
    }
    setTimeout(_rowpaperauto,rowpapertimer.value*1000);
</script>

<template>
    <div class="homepagebody">
        <!-- 上半部分 -->
        <div class="special">

            <!-- 轮播图 -->
            <div class="rowpaper button">
                <div class="overshell leftright">
                    <div class="goneighbour goprevious" @click="_rowpaperrowreverse()">
                        <Icons class="icon"><left_arrow /></Icons>
                    </div>
                    <div class="goneighbour gonext" @click="_rowpaperrow()">
                        <Icons class="icon"><right_arrow /></Icons>
                    </div>
                </div>
                <div class="overshell gopage">
                    <div :class="{'pagesign':true,'pagesignselected':rowpapergoing==index}"
                        v-for="item,index in rowpapergoods"
                        @click="_changerowpaper(index)"
                    >{{ index+1 }}</div>
                </div>
                <div id="rowpapercontain" class="rowpapercontain"
                    :style="'left:'+rowpapergoing*-660+'px'"
                >
                    <img class="img"
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
    @import url(../../css/HomePage.css);
</style>