<script setup>
    //VUE引用
    import { inject, ref } from 'vue';

    //自定义声明
    const {
        right_arrow,
        avator_panel_options,
        users
    } = inject('resource');
</script>

<template>
    <div class="avatorpanelbody">

        <!-- 上半部分 -->
        <div class="blank"></div>
        <div class="username">{{ users[0].user_name }}</div><!-- 后端数据临时使用 -->
        <div class="vip">
            <span class="level">会员等级：{{ users[0].vip_level }}</span><!-- 后端数据临时使用 -->
            <span class="count">积分:{{ users[0].vip_count }}</span><!-- 后端数据临时使用 -->
        </div>

        <!-- 下半部分 -->
        <div v-for="item in avator_panel_options" class="options">
            <Icons class="icon" :IsInList = "item.icon"></Icons>
            <div class="text">{{ item.text }}</div>
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

        &>.level {
            flex: 1;
        }
        &>.count {
            flex: 1;
        }
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

        &>.icon {
            width: 40px;
            height: 40px;
            margin-left: 15px;
            fill: var(--colorgrey);
        }
        &>.text {
            flex: 1;
            height: 40px;
        }
        &>.arrow {
            width: 40px;
            height: 40px;
            margin-right: 15px;
            fill: var(--colorgrey);
        }
    }
</style>