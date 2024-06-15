<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
    //inject
    const store = inject('store');

    //侧边栏
    store._backstage_sidebar(2,4);

    //路径
    store._addpath(1,'BOrder','订单列表');

    //顶部标签状态
    const state = ref(0);
    function _state(id) {
        state.value = id;
        switch(id) {
            case 0 : _getdata('pay');break;
            case 1 : _getdata('send');break;
            case 2 : _getdata('accept');break;
            case 3 : _getdata('comment');break;
            case 4 : _getdata('resend');break;
        }
    }

    //请求数据
    const tabledata = ref([{
        id:'',
        code:'',
        img:'',
        name:'',
        price:'',
        count:'',
        realprice:'',
        buyer:'',
        time:['','',''],
        show:true
    }]);

    function _getdata(type) {
        axios({
            url:'/getOrders',
            method:'get',
            params:{
                type:type
            }
        }).then(res=>{
            tabledata.value.length=0;
            res.data.orders.forEach(item => {
                tabledata.value.push({
                    id:item.id,
                    code:item.code,
                    img:item.img,
                    name:item.name,
                    price:item.price,
                    count:item.count,
                    realprice:item.realprice,
                    buyer:item.buyer,
                    time:[item.time[0],item.time[1],item.time[2]],
                    show:true
                })
            });
        });
    }
    _getdata('pay');

    //查询
    const searchtext = ref('');
    function _search(text) {
        tabledata.value.forEach(item => {
            if(item.code==text||text=='') {
                item.show=true;
            }else{
                item.show=false;
            }
        });
    }
</script>

<template>
    <div class="kindlistbody">
        <!-- 顶栏 -->
        <div class="banner">
            <div class="switch">
                <div :class="{'button':true,'switchitem':true,'selected':state==0}" @click="_state(0)">待付款</div>
                <div :class="{'button':true,'switchitem':true,'selected':state==1}" @click="_state(1)">待发货</div>
                <div :class="{'button':true,'switchitem':true,'selected':state==2}" @click="_state(2)">待收货</div>
                <div :class="{'button':true,'switchitem':true,'selected':state==3}" @click="_state(3)">已完成</div>
                <div :class="{'button':true,'switchitem':true,'selected':state==4}" @click="_state(4)">退货单</div>
            </div>

            <form class="search" @submit.prevent="_search(searchtext)">
                <div class="text">订单号</div>
                <input class="searchbox" type="text" v-model="searchtext">
                <div class="searchbutton button" @click="_search(searchtext)">查询</div>
                <input type="submit" style="width: 0; height: 0;border: none;">
            </form>
        </div>
        <!-- 主体 -->
        <div class="bodymain">
            <table class="maintable">
                <thead>
                    <tr>
                        <th class="id">ID</th>
                        <th class="code">订单号</th>
                        <th class="img">商品图片</th>
                        <th class="name">商品名称</th>
                        <th class="price">单价</th>
                        <th class="count">数量</th>
                        <th class="realprice">实付款</th>
                        <th class="buyer">买家ID</th>
                        <th class="time">创建时间</th>
                        <th class="command">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item,index in tabledata" v-show="item.show">
                        <td>{{ item.id }}</td>
                        <td>{{item.code}}</td>
                        <td><img :src="item.img" alt=""></td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.count }}</td>
                        <td>{{ item.realprice }}</td>
                        <td>{{ item.buyer }}</td>
                        <td>{{item.time[0]}}-{{item.time[1]}}-{{item.time[2]}}</td>
                        <td class="command">
                            <div>
                                <div class="commandbutton delete button" v-show="state==1" @click="_deletekind(index)">去发货</div>
                                <div class="commandbutton delete button" v-show="state==4" @click="_deletekind(index)">收到退货</div>
                                <div class="commandbutton change button" @click="_changekind(index)">联系买家</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
    
<style scoped>
@import url(../../css/Backstage/KindListPage.css);
    .bodymain>.maintable tr>td {
        height: 130px;
    }
    .bodymain>.maintable .id {
        width: 60px;
    }
    .bodymain>.maintable .code {
        width: 190px;
    }
    .bodymain>.maintable .img {
        width: 100px;
    }
    .bodymain>.maintable .command {
        width: 330px;
    }
    .bodymain>.maintable .price {
        width: 120px;
    }
    .bodymain>.maintable .count {
        width: 120px;
    }
    .bodymain>.maintable .realprice {
        width: 120px;
    }
    .bodymain>.maintable .buyer {
        width: 140px;
    }
    .bodymain>.maintable .time {
        width: 150px;
    }
    .bodymain>.maintable td>img {
        width: 72px;
        height: 72px;
        margin: auto;
        object-fit: cover;
    }
    @media only screen and (max-width: 1680px) {
        .bodymain>.maintable tr>td {
            height: 130rem;
        }
        .bodymain>.maintable .id {
            width: 60rem;
        }
        .bodymain>.maintable .code {
            width: 190rem;
        }
        .bodymain>.maintable .img {
            width: 100rem;
        }
        .bodymain>.maintable .command {
            width: 330rem;
        }
        .bodymain>.maintable .price {
            width: 120rem;
        }
        .bodymain>.maintable .count {
            width: 120rem;
        }
        .bodymain>.maintable .realprice {
            width: 120rem;
        }
        .bodymain>.maintable .buyer {
            width: 140rem;
        }
        .bodymain>.maintable .time {
            width: 150rem;
        }
        .bodymain>.maintable td>img {
            width: 72rem;
            height: 72rem;
        }
    }
</style>