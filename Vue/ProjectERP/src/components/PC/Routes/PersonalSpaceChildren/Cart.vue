<script setup>
    import axios from 'axios';
import {ref,inject} from 'vue';
    //请求数据
    const cart = ref([{
        checked:false,
        img:'',
        name:'商品名称',
        realprice:'15.25',
        count:'1',
    }]);
    function _getCart() {
        axios({
            url:'/getUserCart',
            method:'get',
            params:{
                userid:localStorage.getItem('user')
            }
        }).then(res=>{
            cart.value = res.data.cart.slice();
        })
    }
    _getCart();
    // 状态管理
    const store = inject('store');
    function _spc_leftbarselected(selected) {
        store._spc_leftbarselected(selected);
    }
    _spc_leftbarselected(1);
    //计算总价
    function _totalprice() {
        var s = 0;
        cart.value.forEach(item => {
            if(item.checked == true) {
                s += Number(item.realprice) * Number(item.count);
            }
        });
        return s;
    }
    //数量不能为空
    function _countcheck(index) {
        if(cart.value[index].count == ''|| cart.value[index].count <= 0 || cart.value[index].count % 1 != 0) {
            cart.value[index].count = '1'
        }
    }
    //选择商品
    function _checkboxswich(index) {
        cart.value[index].checked = !cart.value[index].checked;
        if(selectall.value &&!cart.value[index].checked) {
            selectall.value = false;
        }
    }
    //全选
    const selectall = ref(false);
    function _checkboxswichall() {
        if(!selectall.value) {
            cart.value.forEach(item => {
                item.checked = true;
            });
        }else {
            cart.value.forEach(item => {
                item.checked = false;
            });
        }
    }
    //删除商品
    function _deleteitem(index) {
        axios({
            url:'/postCartDelete',
            method:'post',
            params:{
                userid:localStorage.getItem('user'),
                goodid:cart.value[index].id
            }
        }).then(res=> {
            for(var i = index; i < cart.value.length-1; i++) {
                cart.value[i] = cart.value[i+1];
            }
            cart.value.pop(1);
        })
    }
</script>

<template>
    <div class="cartbody">
        <div class="titlenprice">
            <div class="title">购物车</div>
            <div class="text">总价：</div>
            <div class="totalprice">￥{{_totalprice().toFixed(2)}}</div>
            <div class="pay">结算</div>
        </div>
        <div class="cutline"></div>
        <div class="tablehead">
            <input class="checkbox" type="checkbox" @click="_checkboxswichall()" v-model="selectall">
            <div class="subtitle img">全选</div>
            <div class="subtitle info">商品信息</div>
            <div class="subtitle price">单价</div>
            <div class="subtitle count">数量</div>
            <div class="subtitle totleprice">金额</div>
            <div class="subtitle command">操作</div>
        </div>
        <div class="maintable">
            <div class="listitem" v-for="item,index in cart">
                <div class="mainitem">
                    <input class="checkbox" type="checkbox" @click="_checkboxswich(index)" v-model="item.checked">
                    <img class="img" :src="item.img" alt="">
                    <div class="info">{{ item.name }}</div>
                    <div class="price">￥{{item.realprice}}</div>
                    <div class="count">
                        <input class="counttextbox"
                            type="number"
                            v-model="item.count"
                            min="1"
                            @keyup="_countcheck(index)"
                            oninput="this.value=this.value.replace(/\D/g);"
                        >
                    </div>
                    <div class="totleprice">￥{{(Number(item.realprice) * Number(item.count)).toFixed(2)}}</div>
                    <div class="command">
                        <div class="cmdbutton button" @click="_deleteitem(index)">删除</div>
                    </div>
                </div>
                <div class="cutline"></div>
            </div>
        </div>
    </div>
</template>
    
<style scoped>
    @import url(../../../../css/Cart.css);
</style>