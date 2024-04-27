<script setup>
import axios from 'axios';
import { ref,inject } from 'vue';
    //请求数据
    const userid = ref(localStorage.getItem('user'));
    const user = ref({
        avator:'',
        username:'用户名称（帐号）',
        usercount:'114514',
        orders:[{
            img:'',
            name:'商品名称',
        }]
    });
    function _getuserdata() {
        axios({
            url:'/getUserOrder',
            method:'get',
            params:{
                userid:userid.value
            }
        }).then(res=>{
            user.value.avator = res.data.user.avator;
            user.value.username = res.data.user.username;
            user.value.usercount = res.data.user.usercount;
        });
    }
    _getuserdata();
    // 状态管理
    const store = inject('store');
    function _spc_leftbarselected(selected) {
        store._spc_leftbarselected(selected);
    }
    _spc_leftbarselected(0);
    // 标签切换
    const subtitleselected = ref(0);
    function _getorders(type) {
        axios({
            url:'/getOrders',
            method:'get',
            params:{
                userid:userid.value,
                type:type
            }
        }).then(res=>{
            user.value.orders = res.data.orders.slice();
        });
    }
    _getorders('pay');
    function _subtitleselect(select) {
        subtitleselected.value = select;
        switch(select) {
            case 0 : _getorders('pay');break;
            case 1 : _getorders('send');break;
            case 2 : _getorders('accept');break;
            case 3 : _getorders('comment');break;
            case 4 : _getorders('resend');break;
        }
    }
</script>

<template>
    <div class="ordermanagebody">
        <!-- 用户信息 -->
        <div class="user">
            <img class="avator" :src="user.avator" alt="">
            <div class="userinfo">
                <div class="username">{{user.username}}</div>
                <div class="usercount">积分：{{user.usercount}}</div>
            </div>
        </div>
        <div class="cutline"></div>
        <!-- 订单管理 -->
        <div class="mainpage">
            <div class="title">订单管理</div>
            <div class="tablehead">
                <div class="filter">
                    <div :class="{'subtitle':true,'button':true,'selected':subtitleselected==0}"
                        @click="_subtitleselect(0)"
                    >待付款</div>
                    <div :class="{'subtitle':true,'button':true,'selected':subtitleselected==1}"
                        @click="_subtitleselect(1)"
                    >待发货</div>
                    <div :class="{'subtitle':true,'button':true,'selected':subtitleselected==2}"
                        @click="_subtitleselect(2)"
                    >待收货</div>
                    <div :class="{'subtitle':true,'button':true,'selected':subtitleselected==3}"
                        @click="_subtitleselect(3)"
                    >待评价</div>
                    <div :class="{'subtitle':true,'button':true,'selected':subtitleselected==4}"
                        @click="_subtitleselect(4)"
                    >退货中</div>
                </div>
                <div class="underline"></div>
            </div>
            <div class="tablemain">
                <div class="tableitem" v-for="item in user.orders">
                    <div class="mainitem">
                        <img class="itemimg" :src="item.img" alt="">
                        <div class="itemname">{{item.name}}</div>
                        <div class="itemcommand">
                            <div class="commandbutton" v-if="subtitleselected == 0">立即支付</div>
                            <div class="commandbutton" v-if="subtitleselected == 1">退款</div>
                            <div class="commandbutton" v-if="subtitleselected == 2">确认收货</div>
                            <div class="commandbutton" v-if="subtitleselected == 2">退款</div>
                            <div class="commandbutton" v-if="subtitleselected == 3">评价</div> 
                            <div class="commandbutton" v-if="subtitleselected == 3">退货</div>
                            <div class="commandbutton" v-if="subtitleselected == 4">取消退货</div>
                            <div class="commandbutton" v-if="subtitleselected == 4">我已寄件</div>
                        </div>
                    </div>
                    <div class="cutline"></div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<style scoped>
    @import url(../../../css/OrderManage.css);
</style>