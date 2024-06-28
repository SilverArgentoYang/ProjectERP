<script setup>
import {inject, ref} from 'vue';
    // components
    import Navigator from './Navigator.vue';
import axios from "axios";
    //injuct
    const store = inject('store');
    //自动登录
    function _autologin() {
        if(localStorage.getItem('user')) {
            axios({
              url:'/postLogin',
              method:'post',
              params:{
                userhash:localStorage.getItem('user')
              }
            }).then(res=>{
              if(res.data.successful){
                store.user_islogin(true,localStorage.getItem('user'));
              }
            })
        }
    }
    _autologin();

//拉取数据
const settingdata = ref({
  name:'',
  logo:'',
  color:'#d90000',
  dcolor:'#d90000',
  ddcolor:'#d90000',
});
function _getshopsetting() {
  axios({
    url:'/getShopSetting',
    method:'get',
    params:{}
  }).then(res=>{
    settingdata.value.name = res.data.settingdata.name;
    settingdata.value.logo = res.data.settingdata.logo;
    settingdata.value.color = res.data.settingdata.color;
    settingdata.value.dcolor = res.data.settingdata.dcolor;
    settingdata.value.ddcolor = res.data.settingdata.ddcolor;
    document.title = settingdata.value.name;
    document.querySelector('link[rel="icon"]').href = settingdata.value.logo;
    document.documentElement.style.setProperty(`--colorred`, settingdata.value.color);
    document.documentElement.style.setProperty(`--colordred`, settingdata.value.dcolor);
    document.documentElement.style.setProperty(`--colorddred`, settingdata.value.ddcolor);
  });
}
_getshopsetting();
</script>
<template>
    <Navigator></Navigator>
    <div class="blank"></div>
    <RouterView></RouterView>
</template>
<style scoped>
    .blank {
        height: 200px;
    }
</style>