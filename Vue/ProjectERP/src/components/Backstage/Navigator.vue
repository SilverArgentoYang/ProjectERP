<script setup>
import axios from "axios";
import { ref,inject, shallowRef } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
    //inject
    const {
        right_arrow,
        search,
        up_arrow,
        down_arrow,
    } = inject('resource');
    const store = inject('store');
    //获取用户信息
    const user = ref({
        userid:'',
        user_name:'',
        isroot:false
    });
    function _getuserinfo() {
        axios({
            url:'/getUserMain',
            method:'get',
            params:{
                userid:localStorage.getItem('user')
            }
        }).then(res => {
            user.value.userid = res.data.user.userid;
            user.value.user_name = res.data.user.user_name;
            user.value.isroot = res.data.user.isroot;
            store._user_avator(res.data.user.avator);
            if(!res.data.user.isroot) {
                router.push({
                    name:'Home'
                })
            }
        });
    }
    if(store.state.user_islogin){
        _getuserinfo();
    }
    //路径
    const paths = ref([{
        path:'BackStage',
        name:'主站'
    }]);
    function _gotopath(index) {
        var path = paths.value[0].path;
        if(paths.value.length > 1) {
            for(;value.length>=index;) {
                path = paths.value.pop().path;
            }
        }
        console.log('path',path);
        console.log('paths',paths.value);
        router.push({
            name:path
        });
    }
    //搜索
    const searchtext = ref('');
    function _search() {
        axios({
            url:'/getBackstageSearch',
            method:'get',
            params:{
                searchtext:searchtext.value
            }
        }).then(res=>{
            router.push({
                name:res.data.jumpname
            });
        })
    }
    //额外功能开关
    const optionpanelopen = ref(false);
    const optionpanelarrow = shallowRef(down_arrow);
    function _optionpanelshow(show) {
        if(show){
            optionpanelopen.value = true;
            optionpanelarrow.value = up_arrow;
        }else{
            optionpanelopen.value = false;
            optionpanelarrow.value = down_arrow;
        }
    }
    //进入修改密码界面
    //退出登录
    function _userlogout(){
        _optionpanelshow(false);
        localStorage.setItem('user','null');
        store.user_islogin();
        store._user_avator('./src/Resource/Imgs/DefaultAvatar512.jpg');
        router.push({
            name:'Home'
        });
    }
</script>

<template>
    <div class="navigatorbody">
        <div class="navigate">
            <div class="button navnode" v-for="item,index in paths" @click="_gotopath(index)">
                <Icons class="icon"><right_arrow /></Icons>
                {{item.name}}
            </div>
        </div>
        <form class="searchbox" @submit.prevent="_search()">
            <input class="input" type="text" v-model="searchtext">
            <Icons class="button icon" @click="_search()"><search /></Icons>
            <input type="submit" style="width: 0; height: 0;border: none;">
        </form>
        <div class="right">
            <div style="position: relative;"><div class="userpanel" v-show="optionpanelopen">
                <div class="button panelitem">修改密码</div>
                <div class="cutline"></div>
                <div class="button panelitem" @click="_userlogout()">退出登录</div>
            </div></div>
            <div class="button userinfo"
                @click="optionpanelopen?_optionpanelshow(false):_optionpanelshow(true)"
            >
                <img class="img" :src="store.state.user_avator" alt="">
                <div class="username">{{user.user_name}}</div>
                <Icons class="icon"><optionpanelarrow /></Icons>
            </div>
        </div>
    </div>
</template>
    
<style scoped>
    @import url(../../css/Backstage/Navigator.css);
</style>