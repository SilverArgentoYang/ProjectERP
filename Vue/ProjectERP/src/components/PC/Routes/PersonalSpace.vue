<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
    const router = useRouter()
    //路由传参
    const props = defineProps({
        userid:{
            type:String,
            default:'000'
        }
    });
    //进入订单管理页面
    function _gotoodermanage() {
        router.push({
            name:'OrderManage'
        });
    }
    //inject
    const {
        right_arrow
    } = inject('resource');
    //左侧菜单选择
    const leftbarselected = ref(0);
    function _leftbarselect(id) {
        leftbarselected.value = id;
        switch(id) {
            case 0:{
                router.push({
                    name:'OrderManage'
                })
            }
        }
    }
</script>

<template>
    <div class="personalbody">
        <div class="leftbar">
            <div class="title">全部功能</div>
            <div :class="{'entry':true,'button':true,'selected':leftbarselected==0}"
                @click="_leftbarselect(0)"
            >
                <div class="text">订单管理</div>
                <Icons class="arrow"><right_arrow/></Icons>
            </div>
            <div :class="{'entry':true,'button':true,'selected':leftbarselected==1}"
                @click="_leftbarselect(1)"
            >
                <div class="text">我的购物车</div>
                <Icons class="arrow"><right_arrow/></Icons>
            </div>
            <div :class="{'entry':true,'button':true,'selected':leftbarselected==2}"
                @click="_leftbarselect(2)"
            >
                <div class="text">我的收藏夹</div>
                <Icons class="arrow"><right_arrow/></Icons>
            </div>
            <div :class="{'entry':true,'button':true,'selected':leftbarselected==3}"
                @click="_leftbarselect(3)"
            >
                <div class="text">我的消息</div>
                <Icons class="arrow"><right_arrow/></Icons>
            </div>
            <div :class="{'entry':true,'button':true,'selected':leftbarselected==4}"
                @click="_leftbarselect(4)"
            >
                <div class="text">我的足迹</div>
                <Icons class="arrow"><right_arrow/></Icons>
            </div>
            <div :class="{'entry':true,'button':true,'selected':leftbarselected==5}"
                @click="_leftbarselect(5)"
            >
                <div class="text">设置管理</div>
                <Icons class="arrow"><right_arrow/></Icons>
            </div>
            <div :class="{'entry':true,'button':true,'selected':leftbarselected==6}"
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
    @import url(../../../css/PersonalSpace.css);
</style>