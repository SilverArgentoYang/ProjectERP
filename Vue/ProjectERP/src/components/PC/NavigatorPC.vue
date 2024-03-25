<script setup>
    //VUE引用
    import { inject, onMounted, ref, toRaw} from 'vue';

    // components
    import NavAvatorPanel from './NavAvatorPanel.vue';
    import NavPopoverPanel from './NavPopoverPanel.vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    const router = useRouter()

    // 状态管理
    const store = inject('store');
    function _avatorpanelshow(ishow) {
        if(store.state.user_islogin){
            store._nav_avatorpanelshow(ishow);
        }
    }
    function _popoverpaneltarget(target) {
        store._nav_popoverpaneltarget(target);
    }
    function _popoverpanelshow(isshow) {
        if(store.state.user_islogin){
            store._nav_popoverpanelshow(isshow);
        }
    }

    // 自定义声明
    const {
        cart,
        favorite,
        history,
        message,
        service,
        search,
        
        nav_bg,
        nav_logo,
        defaul_avator
    } = inject('resource');
    const searchboxtext = ref("");

    //搜索和分类跳转
    function _jumptokind(paramstext,paramstype) {
        paramstext=paramstext.replace(/^\s+|\s+$/g,"");
        if(paramstext=="") {
            paramstext="_all";
        }
        this.searchboxtext = "";
        router.push({
            name:'SearchNTag',
            params:{
                title:paramstext,
                titletype:paramstype
            }
        }).then(()=>{
            location.reload();
        });
    }

    //跳转到首页
    function _jumptohomepage() {
        router.push({
            name:'Home'
        }).then(()=>{
            location.reload();
        });
    }

    //登录和注册
    const loguser = ref({
        avator:'',
        userid:'',
        user_name:'',
        vip_level:'',
        vip_count:'',
        cartlist:[{
            id:0,
            img:'',
            fakeprice:'Undefined',
            realprice:'Undefined',
            name:'Undefined'
        }],
        favoritelist:[{
            id:0,
            img:'',
            fakeprice:'Undefined',
            realprice:'Undefined',
            name:'Undefined'
        }],
        historylist:[{
            id:0,
            img:'',
            fakeprice:'Undefined',
            realprice:'Undefined',
            name:'Undefined'
        }]
    });
    const panellist = ref([]);
    panellist.value = loguser.value.cartlist.slice();
    //初始化登录状态
    function _setlogstate() {
        if(localStorage.getItem('user') == null || localStorage.getItem('user') == 'null'){
            //未登录
            loguser.value.avator = defaul_avator;
        }else{
            // 登录状态
            axios({
                url:'/user',
                method:'get',
                params:{
                    userid:localStorage.getItem('user')
                }
            }).then(res => {
                loguser.value.userid = res.data.user.userid;
                loguser.value.avator = res.data.user.avator;
                loguser.value.user_name = res.data.user.user_name;
                loguser.value.vip_level = res.data.user.vip_level;
                loguser.value.vip_count = res.data.user.vip_count;
                loguser.value.cartlist = res.data.user.cartlist.slice();
                loguser.value.favoritelist = res.data.user.favoritelist.slice();
                loguser.value.historylist = res.data.user.historylist.slice();
            });
            store._setloginstate();
        }
    }
    _setlogstate();

    //读取分类
    const nav_labels = ref([]);
    function _setlabels(){
        axios({
            url:'/navlabels',
            method:'get'
        }).then(res => {
            nav_labels.value = res.data.nav_labels;
        });
    }
    _setlabels();
</script>
<template>
    <div class="navigatorbody">

        <!-- 头图 -->
        <div class = "headimg">
            <img class="IMG" :src="nav_bg" alt="">
            <img class="LOGO button" :src="nav_logo" alt="" @click="_jumptohomepage()">
        </div>

        <!-- 导航栏 -->
        <div class="navigator">
            <!-- 左侧 -->
            <div class="labels">
                <li class="button"
                    v-for="item in nav_labels"
                    @click="_jumptokind(item.name,'label')
                ">{{ item.name }}</li>
            </div>

            <!-- 搜索框 -->
            <div class="searchbox">
                <form @submit.prevent="_jumptokind(searchboxtext,'search')">
                    <input type="text" class="searchimput" name="searchtext" v-model="searchboxtext">
                    <Icons class="searchbutton button"
                        @click="_jumptokind(searchboxtext,'search')
                    "><search /></Icons>
                    <input type="submit" style="width: 0; height: 0;border: none;">
                </form>
            </div>

            <!-- 右侧 -->
            <div class="usersetting">

                <!-- 用户菜单 -->
                <div class="avator"
                        @mouseover="_avatorpanelshow(true)"
                        @mouseleave="_avatorpanelshow(false)"
                    >
                        <img :class="{
                                'avatorimg':true,
                                'button':true,
                                'islogin':store.state.user_islogin
                            }"
                            :src="loguser.avator"
                            @click="loguser=store._userlogin('001')"
                        >
                        <div><NavAvatorPanel
                            class="avatorpanel"
                            :hidden="!store.state.nav_avatorpanelshow"
                            :user="loguser"
                        /></div>
                </div>

                <!-- 导航菜单 -->
                <ul @mouseleave="_popoverpanelshow(false)">
                    <!-- 收藏夹、历史记录、购物车菜单 -->
                    <div><NavPopoverPanel class="popoverpanel"
                        :itemlist="panellist"
                        :style="'left:'+store.state.nav_popoverpanelpos+'px;'"
                        :hidden="!store.state.nav_popoverpanelshow"
                    /></div>

                    <Icons class="cart icon"
                        @mouseover="
                            panellist = loguser.cartlist.slice();
                            _popoverpaneltarget('cart');
                            _popoverpanelshow(true)
                        "
                    ><cart /></Icons> 
                    <Icons class="favorites icon"
                        @mouseover="
                            panellist=loguser.favoritelist.slice();
                            _popoverpaneltarget('favorites');
                            _popoverpanelshow(true)
                        "
                    ><favorite /></Icons>
                    <Icons class="history icon"
                        @mouseover="
                            panellist=loguser.historylist.slice();
                            _popoverpaneltarget('history');
                            _popoverpanelshow(true)
                        "
                    ><history /></Icons>
                </ul>
                <Icons class="massages icon"><message /></Icons>
                <Icons class="nav_service icon"><service /></Icons>
            </div>
        </div>
    </div>
</template>
<style scoped>
    @import url(../../css/NavigatorPC.css);
</style>