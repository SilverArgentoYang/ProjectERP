<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
//inject
const store = inject('store');

//侧边栏
store._backstage_sidebar(4,10);

//路径
store._addpath(1,'BSystem','系统设置');

//拉取数据
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

//保存设置
function updatesetting() {
  axios({
    url:'/postSystemSetting',
    method:'post',
    params:{
      settingdata:settingdata.value,
    }
  }).then(res=>{
    if(res.data.success == 'true') {
    }
  })
}

//修改密码
const password = ref({
  oldpassword:'',
  newpassword:'',
  confirmpassword:''
})
function _postuserpassword() {
  if(password.value.newpassword != '' && password.value.confirmpassword != '' && password.value.newpassword === password.value.confirmpassword) {
    axios({
      url:'/postUserPassword',
      method:'post',
      params:{
        userid:localStorage.getItem('user'),
        oldpassword:password.value.oldpassword,
        newpassword:password.value.newpassword
      }
    }).then(res=>{
      if(res.data.error == '00001') {
        alert('密码错误');
      }
    })
  }else{
    alert('密码格式错误');
  }
}

</script>

<template>
<div class="systemsettingbody">
  <div>
    <div class="banner">
      <div class="thisbutton button" @click="updatesetting()">保存设置</div>
    </div>
  </div>

  <div><div class="checkout">
    <div class="subtitle">本设备是否可签到：</div>
    <div style="height: 25px">
      <input class="checkbox button" type="checkbox" v-model="settingdata.checkoutdevice">
      <div class="checkmark">
        <div class="checkmarkchild"></div>
      </div>
    </div>
  </div></div>

  <div><div class="password">
    <div class="subtitle">修改密码：</div>
    <div class="checkoutbody">
      <div class="inputbox">
        <div class="text">旧密码：</div>
        <input class="input" type="password" v-model="password.oldpassword">
      </div>
      <div class="inputbox">
        <div class="text">新密码：</div>
        <input class="input" type="password" v-model="password.newpassword">
      </div>
      <div class="inputbox">
        <div class="text">确认密码：</div>
        <input class="input" type="password" v-model="password.confirmpassword">
      </div>
      <div class="button thisbutton" @click="_postuserpassword()">修改密码</div>
    </div>
  </div></div>
</div>
</template>

<style scoped>
@import url(../../css/Backstage/SystemSetting.css);
</style>