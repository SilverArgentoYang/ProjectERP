<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
    //inject
    const store = inject('store');

    //侧边栏
    store._backstage_sidebar(2,5);

    //路径
    store._addpath(1,'BDelivery','物流列表');

    //请求数据
    const tabledata = ref([{
        id:'',
        coded:'',
        img:'',
        name:'',
        locnow:['',''],
        locsend:['','','',''],
        locacept:['','','',''],
        codeo:'',
        buyer:'',
        time:['','',''],
        show:true
    }]);

    function _getdata() {
        axios({
            url:'/getDelivery',
            method:'get',
            params:{}
        }).then(res=>{
            tabledata.value.length=0;
            res.data.deliverys.forEach(item => {
                tabledata.value.push({
                    id:item.id,
                    coded:item.coded,
                    img:item.img,
                    name:item.name,
                    locnow:[item.locnow[0],item.locnow[1]],
                    locsend:[item.locsend[0],item.locsend[1],item.locsend[2],item.locsend[3]],
                    locacept:[item.locacept[0],item.locacept[1],item.locacept[2],item.locacept[3]],
                    codeo:item.codeo,
                    buyer:item.buyer,
                    time:[item.time[0],item.time[1],item.time[2]],
                    show:true
                })
            });
        });
    }
    _getdata();

    //查询
    const searchtext = ref('');
    function _search(text) {
        tabledata.value.forEach(item => {
            if(item.coded==text||text=='') {
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
            <form class="search" @submit.prevent="_search(searchtext)">
                <div class="text">快递单号</div>
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
                        <th class="coded">快递单号</th>
                        <th class="img">商品图片</th>
                        <th class="name">商品名称</th>
                        <th class="locnow">当前位置</th>
                        <th class="locsend">发货地址</th>
                        <th class="locacept">收货地址</th>
                        <th class="codeo">订单号</th>
                        <th class="buyer">买家ID</th>
                        <th class="time">创建时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in tabledata" v-show="item.show">
                        <td>{{ item.id }}</td>
                        <td>{{item.coded}}</td>
                        <td><img :src="item.img" alt=""></td>
                        <td>{{ item.name }}</td>
                        <td>{{item.locnow[0]}}<br/>{{item.locnow[1]}}</td>
                        <td>{{item.locsend[0]}}<br/>{{item.locsend[1]}}<br/>{{item.locsend[2]}}<br/>{{item.locsend[3]}}</td>
                        <td>{{item.locacept[0]}}<br/>{{item.locacept[1]}}<br/>{{item.locacept[2]}}<br/>{{item.locacept[3]}}</td>
                        <td>{{ item.codeo }}</td>
                        <td>{{ item.buyer }}</td>
                        <td>{{item.time[0]}}-{{item.time[1]}}-{{item.time[2]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
    
<style scoped>
    @import url(../../css/Backstage/KindListPage.css);
    .bodymain>.maintable tr>td {
        height: 120px;
    }
    .bodymain>.maintable .id {
        width: 50px;
    }
    .bodymain>.maintable .coded {
        width: 200px;
    }
    .bodymain>.maintable .img {
        width: 110px;
    }
    .bodymain>.maintable .locnow {
        width: 120px;
    }
    .bodymain>.maintable .locsend {
        width: 180px;
    }
    .bodymain>.maintable .locacept {
        width: 180px;
    }
    .bodymain>.maintable .codeo {
        width: 200px;
    }
    .bodymain>.maintable .buyer {
        width: 150px;
    }
    .bodymain>.maintable .time {
        width: 140px;
    }
    .bodymain>.maintable td>img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        margin: auto;
    }
    @media only screen and (max-width: 1680px) {
        .bodymain>.maintable tr>td {
            height: 120rem;
        }
        .bodymain>.maintable .id {
            width: 50rem;
        }
        .bodymain>.maintable .coded {
            width: 200rem;
        }
        .bodymain>.maintable .img {
            width: 110rem;
        }
        .bodymain>.maintable .locnow {
            width: 120rem;
        }
        .bodymain>.maintable .locsend {
            width: 180rem;
        }
        .bodymain>.maintable .locacept {
            width: 180rem;
        }
        .bodymain>.maintable .codeo {
            width: 200rem;
        }
        .bodymain>.maintable .buyer {
            width: 150rem;
        }
        .bodymain>.maintable .time {
            width: 140rem;
        }
        .bodymain>.maintable td>img {
            width: 80rem;
            height: 80rem;
        }
    }
</style>