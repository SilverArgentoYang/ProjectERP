<script setup>
import axios from 'axios';
import {ref,inject} from 'vue';
    // 状态管理
    const store = inject('store');
    function _spc_leftbarselected(selected) {
        store._spc_leftbarselected(selected);
    }
    function _fav_command(params) {
        store._fav_command(params);
    }
    function _fav_commandhistoryread() {
        return store._fav_commandhistoryread();
    }
    function _fav_commandreset() {
        store._fav_commandreset();
    }
    //刷新时保持左侧菜单栏选项
    _spc_leftbarselected(2);
    //components
    import Gooditem from '../../GoodsItemsmall.vue';
    //导入商品
    const favorites = ref([{
        id:'',
        img:"",
        realprice:"",
        fakeprice:"",
        name:""
    }]);
    function _getfavorites() {
        axios({
            url:'/getFavorite',
            method:'get',
            params:{
                userid:localStorage.getItem('user')
            }
        }).then(res=>{
            favorites.value.length=0;
            res.data.favorites.forEach(item => {
                favorites.value.push({
                    id:item.id,
                    img:item.img,
                    realprice:item.realprice,
                    fakeprice:item.fakeprice,
                    name:item.name
                })
            });
        });
    }
    _getfavorites();

    //管理按钮
    const commanding = ref(false);
    function _command() {
        if(!commanding.value) {
            _fav_command(true);
            commanding.value = true;
        }
    }
    function _commanddone() {
        if(commanding.value) {
            _fav_command(false);
            commanding.value = false;

            var commandhistory = [];
            commandhistory = _fav_commandhistoryread();
            axios({
                url:'/postRemoveFavorite',
                method:'post',
                params:{
                    userid:localStorage.getItem('user'),
                    goodid:commandhistory
                }
            }).then(res =>{
                location.reload();
            }).catch(err=>{
                location.reload();
            });
            _fav_commandreset();
        }
    }
</script>

<template>
    <div class="favoritebody">
        <div class="titlencommand">
            <div class="title">收藏夹</div>
            <div class="command button" @click="_command()" v-show="!commanding">管理</div>
            <div class="command button" @click="_commanddone()" v-show="commanding">完成</div>
        </div>
        <div class="cutline"></div>
        <div class="main">
            <Gooditem v-for="item in favorites" :good="item"></Gooditem>
        </div>
    </div>
</template>
    
<style scoped>
    @import url(../../../css/Favorite.css);
</style>