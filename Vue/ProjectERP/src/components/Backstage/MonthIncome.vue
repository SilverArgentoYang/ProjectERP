<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
//inject
const store = inject('store');

//侧边栏
store._backstage_sidebar(5,13);

//路径
store._addpath(1,'BMonth','月度账单');

//总收入
const totalincome = ref(0);

//请求数据
const tabledata = ref([{
  id:'',
  code:'',
  img:'',
  name:'',
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
      if(item.time[0]==new Date().getFullYear() && item.time[1]==new Date().getMonth()+1){
        tabledata.value.push({
          id:item.id,
          code:item.code,
          img:item.img,
          name:item.name,
          realprice:item.realprice,
          buyer:item.buyer,
          time:[item.time[0],item.time[1],item.time[2]],
          show:true
        })
      }
    });
    tabledata.value.forEach(item => {
      totalincome.value += Number(item.realprice);
    });
    totalincome.value = totalincome.value.toFixed(2);
  });
}
_getdata('comment');

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
  <div class="dailybody">
    <!-- 顶栏 -->
    <div class="banner">
      <div class="switch">
        本月收入：<span style="color: var(--colorred);font-weight: bold">￥{{totalincome}}</span>
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
          <th class="realprice">交易额</th>
          <th class="buyer">买家ID</th>
          <th class="time">交易时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tabledata" v-show="item.show">
          <td>{{ item.id }}</td>
          <td>{{item.code}}</td>
          <td><img :src="item.img" alt=""></td>
          <td>{{ item.name }}</td>
          <td>{{ item.realprice }}</td>
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
.switch {
  font-size: 16px;
  gap: 0 !important;
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
  .switch {
    font-size: 16rem;
  }
}
</style>