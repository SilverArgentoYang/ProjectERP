<script setup>
    //VUE引用
    import { inject, ref } from 'vue';

    // components
    import GoodsItem from './../GoodsItem.vue'
    import axios from 'axios';
    
    // 自定义声明
    const {
        right_arrow,
        left_arrow,
        up_arrow,
        down_arrow,
    }=inject('resource');

    //路由传参
    const props = defineProps({
        title:{
            type:String,
            default:"全部"
        },
        titletype:{
            type:String,
            default:"search"
        }
    })

    //读取标签
    const tags = ref([
        {
            choosing:false,
            name:'Undefined'
        }
    ]);
    axios({
        url:'/getTagsGoods',
        method:'get',
        params:{
            comp:props.title
        }
    }).then(res=>{
        tags.value = res.data.tags.slice(); 
    });

    //读取商品
    const goods = ref([
        {
            id:"",
            img:"",
            fakeprice:"Undefined",
            realprice:"Undefined",
            name : "Undefined"
        }
    ]);
    const data = ref({})
    if(props.titletype == 'search') {
        data.value = {
            search:props.title
        }
    }else if(props.titletype == 'label') {
        data.value = {
            label:props.title
        }
    }
    axios({
        url:'/getGoodsMain',
        method:'get',
        params:data.value
    }).then(res => {
        goods.value = res.data.goods.slice();
    })

    //页码
    const pagetotal = ref(1);
    const page = ref(1);
    //下一页上一页
    function _pageup() {
        if(page.value < pagetotal.value) {
            page.value += 1;
        }
    }
    function _pagedown() {
        if(page.value > 1) {
            page.value -= 1;
        }
    }
    //标签
    function _tagselect(index) {
        if(!tags.value[index].choosing){
            tags.value[index].choosing = true;
        }else{
            tags.value[index].choosing = false;
        }
        var tagchoose = [];
        tags.value.forEach(item => {
            if(item.choosing) {
                tagchoose.push(item.name);
            }
        });
        axios({
            url:'/getGoodsMain',
            method:'get',
            params:{
                search:data.value.search,
                label:data.value.label,
                tags:tagchoose
            }
        }).then(res=> {
            goods.value = res.data.goods.slice();
        });
    }

    // 二次检索
    const sort = ref(-1);
    const pricelow = ref();
    const pricehigh = ref();
    function _sort(sort,pricelow,pricehigh){
        this.sort = sort;
        axios({
            url:'/getGoodsMain',
            method:'get',
            params:{
                search:this.data.search,
                label:this.data.label,
                tag:this.tags[this.tagchoose],
                sort,
                pricelow,
                pricehigh
            }
        }).then(res=> {
            this.goods = res.data.goods.slice();
        });
    }
</script>

<template>
    <div class="kindpagebody">
        <div class="toolsbar">
            <!-- 标题 -->
            <div class="title">{{title}}:</div>

            <!-- 标签 -->
            <div class="tags">
                <div 
                    v-for="item,index in tags" 
                    :class="{'tag':true,'button':true,'choosing':item.choosing}" 
                    @click="_tagselect(index)"
                >{{item.name}}</div>
            </div>

            <div class="cutline"></div>

            <!-- 选项 -->
            <div class="options">
                <div class="left">
                    <div class="option1 button" @click="_sort(0,pricelow,pricehigh)">综合排序</div>
                    <div class="option1 button" @click="_sort(1,pricelow,pricehigh)">销量</div>
                    <div class="option1 button" @click="_sort(2,pricelow,pricehigh)">新品</div>
                    <div class="option1 button" @click="_sort(3,pricelow,pricehigh)">收藏</div>
                    <div class="option1">
                        价格
                        <div>
                            <Icons class="upanddown button"
                                @click="_sort(4,pricelow,pricehigh)
                            "><up_arrow /></Icons>
                            <Icons class="upanddown button"
                                @click="_sort(5,pricelow,pricehigh)
                            "><down_arrow /></Icons>
                        </div>
                    </div>
                    <div class="option2">
                        <form class="inputbox" @submit.prevent="_sort(sort,pricelow,pricehigh)">
                            ￥<input class="input" type="text" maxlength="9" v-model="pricelow">
                            <input type="submit" style="width: 0; height: 0;border: none;">
                        </form>
                        -
                        <form class="inputbox" @submit.prevent="_sort(sort,pricelow,pricehigh)">
                            ￥<input class="input" type="text" maxlength="9" v-model="pricehigh">
                            <input type="submit" style="width: 0; height: 0;border: none;">
                        </form>
                    </div>
                </div>

                <div class="right">
                    {{page}}/{{pagetotal = parseInt(goods.length / 15)+1}}
                    <Icons :class="'leftandright button'+(page==1?'':' enable')"
                        @click="_pagedown()"
                    ><left_arrow /></Icons>
                    <Icons :class="'leftandright button'+(page==pagetotal?'':' enable')"
                        @click="_pageup()
                    "><right_arrow /></Icons>
                </div>
            </div>
        </div>
        <div class="itemlist">
            <!-- 下半部分 -->
            <GoodsItem class="normalitem"
                v-for="item in goods.slice((page-1)*15,page*15)"
                :good="item"
            ></GoodsItem>
        </div>
    </div>
</template>

<style scoped>
    @import url(../../css/KindPage.css);
</style>