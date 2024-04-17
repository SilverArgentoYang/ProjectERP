<script setup>
    //VUE引用
    import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
    const router = useRouter();

    //自定义声明
    const {
        right_arrow,
        space,
        setting,
        outlog,
    } = inject('resource');
    // 状态管理
    const store = inject('store');
    function _spc_leftbarselected(selected) {
        store._spc_leftbarselected(selected);
    }

    //props导入
    const props = defineProps({
        user:{
            type:Object,
            default:{
                avator:'',
                userid:'',
                user_name:'Undefine',
                vip_level:'Undefine',
                vip_count:'Undefine'
            }
        }
    });

    //个人中心
    function _gotopersonalspace() {
        _spc_leftbarselected(0);
        router.push({
            name:'OrderManage',
        });
    }
</script>

<template>
    <div class="avatorpanelbody">

        <!-- 上半部分 -->
        <div class="blank"></div>
        <div class="username">{{ user.user_name }}</div><!-- 后端数据临时使用 -->
        <div class="vip">
            <span class="level">会员等级：{{ user.vip_level }}</span><!-- 后端数据临时使用 -->
            <span class="count">积分:{{ user.vip_count }}</span><!-- 后端数据临时使用 -->
        </div>

        <!-- 下半部分 -->
        <div class="options button" @click="_gotopersonalspace()">
            <Icons class="icon"><space /></Icons>
            <div class="text">个人中心</div>
            <Icons class="arrow"><right_arrow /></Icons>
        </div>
        <div class="options button">
            <Icons class="icon"><setting /></Icons>
            <div class="text">系统设置</div>
            <Icons class="arrow"><right_arrow /></Icons>
        </div>
        <div class="options button" @click="store._userlogout();">
            <Icons class="icon"><outlog /></Icons>
            <div class="text">退出登录</div>
            <Icons class="arrow"><right_arrow /></Icons>
        </div>

    </div>
</template>

<style scoped>
    .avatorpanelbody {
        background-color: var(--colorwhite);
        border-radius: 15px;
        box-shadow: 0 1px 1px var(--shadowblack);
        width: 300px;
        padding: 9px 0;
    }
    
    /* 上半部分 */
    .blank {
        width: 100%;
        height: 50px;
    }
    .username {
        width: 100%;
        height: 45px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        line-height: 45px;
        color: var(--colorred);
    }
    .vip {
        width: 100%;
        height: 45px;
        margin-bottom: 19px;
        display: flex;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        line-height: 45px;
        color: var(--colorblack);
    }
    .vip>.level {
        flex: 1;
    }
    .vip>.count {
        flex: 1;
    }
    /* 下半部分 */
    .options {
        width: 100%;
        height: 45px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        line-height: 45px;
        color: var(--colorblack);
    }
    .options>.icon {
        width: 40px;
        height: 40px;
        margin-left: 15px;
        fill: var(--colorgrey);
    }
    .options>.text {
        flex: 1;
        height: 40px;
    }
    .options>.arrow {
        width: 40px;
        height: 40px;
        margin-right: 15px;
        fill: var(--colorgrey);
    }
</style>