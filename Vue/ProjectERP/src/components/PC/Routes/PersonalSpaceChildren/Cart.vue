<script setup>
    import {ref} from 'vue';
    //请求数据
    const cart = ref([{
        checked:false,
        img:'',
        name:'商品名称',
        realprice:'15.25',
        count:'1',
    }]);
    function _totalprice() {
        var s = 0;
        cart.value.forEach(item => {
            s += Number(item.realprice) * Number(item.count);
        });
        return s;
    }
</script>

<template>
    <div class="cartbody">
        <div class="titlenprice">
            <div class="title">购物车</div>
            <div class="text">总价：</div>
            <div class="price">￥{{_totalprice()}}</div>
            <div class="pay">结算</div>
        </div>
        <div class="cutline"></div>
        <div class="tablehead">
            <input class="checkbox" type="checkbox">
            <div class="subtitle img">全选</div>
            <div class="subtitle info">商品信息</div>
            <div class="subtitle price">单价</div>
            <div class="subtitle count">数量</div>
            <div class="subtitle totleprice">金额</div>
            <div class="subtitle command">操作</div>
        </div>
        <div class="maintable">
            <div class="listitem" v-for="item in cart">
                <div class="mainitem">
                    <input class="checkbox" type="checkbox">
                    <img class="img" :src="item.img" alt="">
                    <div class="info">{{ item.name }}</div>
                    <div class="price">￥{{item.realprice}}</div>
                    <div class="count">
                        <input class="counttextbox"
                            type="number"
                            v-model="item.count"
                            min="1"
                        >
                    </div>
                    <div class="totleprice">￥{{Number(item.realprice) * Number(item.count)}}</div>
                    <div class="command">
                        <div class="cmdbutton">删除</div>
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