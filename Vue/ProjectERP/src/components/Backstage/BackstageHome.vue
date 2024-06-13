<script setup>
import {inject, ref} from 'vue';
import axios from "axios";

    
    //inject
    const store = inject('store');

    //侧边栏
    store._backstage_sidebar(0,0);

//拉取数据
const user = ref({
  name:'',
});
const time = ref('');
function _getusermain() {
  axios({
    url: '/getUserMain',
    method:'get',
    params:{
      userid:localStorage.getItem('user')
    }
  }).then(res=>{
    user.value.name = res.data.user.user_name;
  });
  var hour = new Date().getHours()
  if(hour >= 5 && hour <= 8){
    time.value = '早上';
  }else if(hour > 8 && hour <= 10){
    time.value = '上午';
  }else if(hour > 10 && hour <= 13){
    time.value = '中午';
  }else if(hour > 13 && hour <= 16){
    time.value = '下午';
  }else if(hour > 16 && hour <= 19){
    time.value = '傍晚';
  }else{
    time.value = '晚上';
  }
}
_getusermain();

//获取订单列表
const money = ref({
  dayly:'0.00',
  month:'0.00'
});
const deals = ref([]);
function _getdeals(){
  axios({
    url:'/getOrders',
    method:'get',
    params:{
      type:'comment'
    }
  }).then(res=>{
    res.data.orders.forEach(item => {
      deals.value.push({
        id:item.id,
        name:item.name,
        realprice:item.realprice
      });
    });
  });

  var nowyear = new Date().getFullYear();
  var nowmonth = new Date().getFullYear() + '-' + (new Date().getMonth()+1);
  var nowdate = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();
  axios({
    url:'/getMoney',
    method:'get',
    params:{}
  }).then(res=>{
    res.data.money.forEach(item => {
      if(item.time == nowyear) {
        item.month.forEach(itemj=>{
          if(itemj.time == nowmonth) {
            money.value.month = itemj.total;
            itemj.dayly.forEach(itemk=>{
              if(itemk.time == nowdate) {
                money.value.dayly = itemk.total;
              }
            })
          }
        })
      }
    });
  });
}
_getdeals();

//获取用户列表
const usernumber = ref({
  month:'0',
  total:'0'
});
const users = ref([]);
function _getusers(){
  axios({
    url:'/getUserAll',
    method:'get',
    params:{}
  }).then(res=>{
    res.data.users.forEach(item => {
      users.value.push({
        id:item.id,
        name:item.name,
        time:item.time[0]+'-'+item.time[1]+'-'+item.time[2]
      });
    });
  });

  var nowyear = new Date().getFullYear();
  var nowmonth = new Date().getFullYear() + '-' + (new Date().getMonth()+1);
  var nowdate = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();
  axios({
    url:'/getUserNumber',
    method:'get',
    params:{}
  }).then(res=>{
    res.data.usernumber.forEach(item => {
      if(item.time == nowyear) {
        item.month.forEach(itemj=>{
          if(itemj.time == nowmonth) {
            usernumber.value.month = itemj.total;
          }
        })
      }
    });
    usernumber.value.total = res.data.total
  });
}
_getusers();

//获取签到设置
const settingdata = ref({
  checkoutdevice:false,
});
function _getsystemsetting() {
  axios({
    url: '/getSystemSetting',
    method:'get',
    params:{}
  }).then(res=>{
    settingdata.value.checkoutdevice = res.data.settingdata.checkoutdevice;
  });
}
_getsystemsetting();

//签到
const checkoutuser = ref({
  username:'',
  password:''
})
function _checkout() {
  axios({
    url:'/postUserCheckout',
    method:'post',
    params:{
      username:checkoutuser.value.username,
      password:checkoutuser.value.password,
    }
  }).then(res=>{
    if(res.data.success == 'true'){
    }
  });
}
</script>

<template>
    <div class="homebody">
      <div class="box banner">{{ time }}好，{{ user.name }}</div>

      <div class="box checkout" v-if="settingdata.checkoutdevice">
        <div class="checkoutbody">
          <div class="inputbox">
            <div class="text">用户名：</div>
            <input class="input" type="text" v-model="checkoutuser.username">
          </div>
          <div class="inputbox">
            <div class="text">密码：</div>
            <input class="input" type="password" v-model="checkoutuser.password">
          </div>
          <div class="button thisbutton" @click="_checkout()">签到</div>
        </div>
      </div>

      <div class="data">
        <div class="box money">
          <div class="total">
            <div class="dayly">
              <div class="text">今日收入</div>
              <div class="moneytext">￥{{ money.dayly }}</div>
            </div>
            <div class="cutline2"></div>
            <div class="month">
              <div class="text">本月收入</div>
              <div class="moneytext">￥{{ money.month }}</div>
            </div>
          </div>
          <div class="cutline"></div>
          <div class="dealist">
            <div class="listitem" v-for="item in deals">
              <div class="name">{{item.name}}</div>
              <div class="price">￥{{ item.realprice }}</div>
            </div>
          </div>
        </div>
        <div class="box goods">
          <div class="total">
            <div class="dayly">
              <div class="text">本月注册用户</div>
              <div class="moneytext">{{ usernumber.month }}</div>
            </div>
            <div class="cutline2"></div>
            <div class="month">
              <div class="text">所有用户数量</div>
              <div class="moneytext">{{ usernumber.total }}</div>
            </div>
          </div>
          <div class="cutline"></div>
          <div class="dealist">
            <div class="listitem" v-for="item in users">
              <div class="name">{{ item.name }}</div>
              <div class="price">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
    
<style scoped>
@import url(../../css/Backstage/HomePage.css);
</style>