<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
    const router = useRouter()
    //路由传参
    //inject
    const {
        right_arrow
    } = inject('resource');
    // 状态管理
    const store = inject('store');
    function _spc_leftbarselected(selected) {
        store._spc_leftbarselected(selected);
    }
    //左侧菜单选择
    function _leftbarselect(id) {
        _spc_leftbarselected(id);
        switch(id) {
            // 进入订单管理页面
            case 0:{
                router.push({
                    name:'OrderManage'
                });
                break;
            }
            // 进入购物车页面
            case 1:{
                router.push({
                    name:'Cart'
                });
                break;
            }
            // 进入收藏夹页面
            case 2:{
                router.push({
                    name:'Favorite'
                });
                break;
            }
            // 进入消息页面
            case 3:{
                router.push({
                    name:'Message'
                });
                break;
            }
            // 进入历史记录页面
            case 4:{
                router.push({
                    name:'History'
                });
                break;
            }
            // 进入设置页面
            case 5:{
                router.push({
                    name:'Setting'
                });
                break;
            }
            // 进入联系客服页面
          case 6:{
            router.push({
              name:'Service'
            });
            break;
          }
        }
    }
</script>

<template>
    <div class="personalbody">
        <div class="leftbar">
            <div class="title">全部功能</div>
            <div :class="{'entry':true,'button':true,'selected':store.state.spc_leftbarselected==0}"
                @click="_leftbarselect(0)"
            >
                <div class="text">订单管理</div>
                <Icons class="arrow"><right_arrow/></Icons>
            </div>
            <div :class="{'entry':true,'button':true,'selected':store.state.spc_leftbarselected==1}"
                @click="_leftbarselect(1)"
            >
                <div class="text">我的购物车</div>
                <Icons class="arrow"><right_arrow/></Icons>
            </div>
            <div :class="{'entry':true,'button':true,'selected':store.state.spc_leftbarselected==2}"
                @click="_leftbarselect(2)"
            >
                <div class="text">我的收藏夹</div>
                <Icons class="arrow"><right_arrow/></Icons>
            </div>
            <div :class="{'entry':true,'button':true,'selected':store.state.spc_leftbarselected==3}"
                @click="_leftbarselect(3)"
            >
                <div class="text">我的消息</div>
                <Icons class="arrow"><right_arrow/></Icons>
            </div>
            <div :class="{'entry':true,'button':true,'selected':store.state.spc_leftbarselected==4}"
                @click="_leftbarselect(4)"
            >
                <div class="text">我的足迹</div>
                <Icons class="arrow"><right_arrow/></Icons>
            </div>
            <div :class="{'entry':true,'button':true,'selected':store.state.spc_leftbarselected==5}"
                @click="_leftbarselect(5)"
            >
                <div class="text">设置管理</div>
                <Icons class="arrow"><right_arrow/></Icons>
            </div>
            <div :class="{'entry':true,'button':true,'selected':store.state.spc_leftbarselected==6}"
                @click="_leftbarselect(6)"
            >
                <div class="text">联系客服</div>
                <Icons class="arrow"><right_arrow/></Icons>
            </div>
        </div>
        <RouterView class="routernode"></RouterView>
    </div>
</template>
    
<style scoped>
    @import url(../../css/PersonalSpace.css);
</style>