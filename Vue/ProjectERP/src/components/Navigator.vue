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
    function _spc_leftbarselected(selected) {
        store._spc_leftbarselected(selected);
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
        })
    }

    //获取用户信息
    const user = ref({
        userid:'',
        user_name:'',
        vip_level:'',
        vip_count:'',
        isroot:''
    });
    function _setlogstate() {
        axios({
            url:'/getUserMain',
            method:'get',
            params:{
                userid:localStorage.getItem('user')
            }
        }).then(res => {
            user.value.userid = res.data.user.userid;
            user.value.user_name = res.data.user.user_name;
            user.value.vip_level = res.data.user.vip_level;
            user.value.vip_count = res.data.user.vip_count;
            user.value.isroot = res.data.user.isroot;
            store._user_avator(res.data.user.avator);
        });
    }
    if(store.state.user_islogin){
        _setlogstate();
    }

    //读取分类
    const nav_labels = ref([]);
    function _setlabels(){
        axios({
            url:'/getLabelsNav',
            method:'get'
        }).then(res => {
            nav_labels.value = res.data.nav_labels;
        });
    }
    _setlabels();

    // 前往购物车页面
    function _gotocartpage() {
        if(store.state.user_islogin) {
            _spc_leftbarselected(1);
            router.push({
                name:'Cart',
            });
        }else{
            store._showmessage('请登录');
        }
    }
    // 前往收藏夹页面
    function _gotofavoritepage() {
        if(store.state.user_islogin) {
            _spc_leftbarselected(2);
            router.push({
                name:'Favorite',
            });
        }else{
            store._showmessage('请登录');
        }
    }
    // 前往历史记录页面
    function _gotohistorypage() {
        if(store.state.user_islogin) {
            _spc_leftbarselected(4);
            router.push({
                name:'History',
            });
        }else{
            store._showmessage('请登录');
        }
    }
    // 前往消息页面
    function _gotomessagepage() {
        if(store.state.user_islogin) {
            _spc_leftbarselected(3);
            router.push({
                name:'Message',
            });
        }else{
            store._showmessage('请登录');
        }
    }

    //请求购物车信息
    const panellist = ref([]);
    const cartlist = ref([]);
    function _getcart() {
        if(store.state.user_islogin) {
            axios({
                url:'/getCart',
                method:'get',
                params:{
                    userid:localStorage.getItem('user')
                }
            }).then(res=>{
                cartlist.value = res.data.cart.slice();
            })
        }
    }
    //请求收藏夹信息
    const favoritelist = ref([]);
    function _getfavorite() {
        if(store.state.user_islogin) {
            axios({
                url:'/getFavorite',
                method:'get',
                params:{
                    userid:localStorage.getItem('user')
                }
            }).then(res=>{
                favoritelist.value = res.data.favorites.slice();
            })
        }
    }
    //请求历史记录信息
    const historylist = ref([]);
    function _gethistory() {
        if(store.state.user_islogin) {
            axios({
                url:'/getHistory',
                method:'get',
                params:{
                    userid:localStorage.getItem('user')
                }
            }).then(res=>{
                res.data.history.goods.forEach(item => {
                    item.forEach(item => {
                        historylist.value.push(item);
                    });
                });
            })
        }
    }
    _getcart();
    _getfavorite();
    _gethistory();
    //登录
    function _userlogin() {
        if(!store.state.user_islogin) {
            router.push({
                name:'LoginLogup',
            });
        }
    }
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
                            :src="store.state.user_avator"
                            @click="_userlogin()"
                        >
                        <div><NavAvatorPanel
                            class="avatorpanel"
                            :hidden="!store.state.nav_avatorpanelshow"
                            :user="user"
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

                    <Icons class="cart icon button"
                        @mouseover="
                            panellist=cartlist.slice();
                            _popoverpaneltarget('cart');
                            _popoverpanelshow(true)
                        "
                        @click="_gotocartpage()"
                    ><cart /></Icons> 
                    <Icons class="favorites icon button"
                        @mouseover="
                            panellist=favoritelist.slice();
                            _popoverpaneltarget('favorites');
                            _popoverpanelshow(true)
                        "
                        @click="_gotofavoritepage()"
                    ><favorite /></Icons>
                    <Icons class="history icon button"
                        @mouseover="
                            panellist=historylist.slice();
                            _popoverpaneltarget('history');
                            _popoverpanelshow(true)
                        "
                        @click="_gotohistorypage()"
                    ><history /></Icons>
                    <Icons class="massages icon button"
                        @mouseover="_popoverpanelshow(false)"
                        @click="_gotomessagepage()"
                    ><message /></Icons>
                    <Icons class="service icon button"
                        @mouseover="_popoverpanelshow(false)"
                    ><service /></Icons>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped>
    @import url(../css/Navigator.css);
</style>