<script setup>
import axios from 'axios';
import { inject,ref } from 'vue';
import { useRouter } from 'vue-router';
    const router = useRouter();
    //store
    const store = inject('store');
    //跳转到首页
    function _jumptohomepage() {
        router.push({
            name:'Home'
        })
    }
    //测试登录
    function _testlog() {
        localStorage.setItem('user','001');
        store.user_islogin(true);
        _jumptohomepage();
    }

    //数据绑定
    const username = ref('');
    const password = ref('');
    const confirmpassword = ref('');
    const title = ref('登录');
    const loginlogon = ref('登录');
    const change = ref('没有帐号？去注册');

    // 切换注册/登录
    const state = ref(false);
    function _changestate() {
        if(!state.value) {
            // 登录状态
            state.value = true;
            change.value = '已有帐号？去登录';
            title.value = '注册';
            loginlogon.value = '注册';
        }else{
            // 注册状态
            state.value = false;
            change.value = '没有帐号？去注册';
            title.value = '登录'
            loginlogon.value = '登录';
        }
    }

    //登录
    function _login() {
        if(!state.value) {
            if(username.value==''||password.value=='') {
                store._showmessage('用户名或密码为空');
            }else{
                axios({
                    url:'/postLogin',
                    method:'post',
                    params:{
                        username:username.value,
                        password:password.value
                    }
                }).then(res=>{
                    if(res.data.successful) {
                        localStorage.setItem('user',res.data.userhash);
                        store.user_islogin(true,res.data.userhash);
                        _jumptohomepage();
                    }else{
                        if(res.data.error == 1) {
                            store._showmessage('密码错误');
                        }
                        if(res.data.error == 2) {
                            store._showmessage('用户名不存在');
                        }
                    }
                });
            }
        }else{
          if(username.value==''||password.value==''||confirmpassword.value=='') {
            store._showmessage('用户名或密码为空');
          }else{
            if(password.value!=confirmpassword.value){
              store._showmessage('密码不一致');
            }else{
              axios({
                url:'/postLogon',
                method:'post',
                params:{
                  username:username.value,
                  password:password.value
                }
              }).then(res=>{
                if(res.data.successful) {
                  store._showmessage('注册成功');
                  _changestate(false);
                }else{
                  if(res.data.error == 1) {
                    store._showmessage('用户名不符合规范');
                  }
                  if(res.data.error == 2) {
                    store._showmessage('用户名已存在');
                  }
                }
              });
            }
          }
        }
    }
</script>

<template>
    <div class="loginbody">
        <form class="over" @submit.prevent="_login()">
            <div class="title">{{title}}</div>
            <input class="input username"
                type="text"
                placeholder="用户名"
                v-model="username"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='用户名'"
            >
            <input class="input password"
                type="password"
                placeholder="密码"
                v-model="password"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='密码'"
            >
            <input class="input confirmpassword"
                type="password"
                placeholder="确认密码"
                v-model="confirmpassword"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='确认密码'"
                v-show="state"
            >
            <div class="button loginlogon" @click="_login()">{{loginlogon}}</div>
            <div class="button change" @click="_changestate()">{{change}}</div>
            <input type="submit" style="width: 0; height: 0;border: none;">
        </form>
    </div>
</template>
    
<style scoped>
    @import url(../css/Login.css);
</style>