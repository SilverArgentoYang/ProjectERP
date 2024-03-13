<script setup>
    //VUE引用
    import { inject } from 'vue';

    // components
    import GoodsItem from './../GoodsItem.vue'

    // 自定义声明
    const {
        goods,
        rowpapergoods,
        suggestgoods
    }=inject('resource')
</script>

<template>
    <div class="homepagebody">
        <!-- 上半部分 -->
        <div class="special">

            <!-- 轮播图 -->
            <div class="rowpaper">
                <div class="rowpapercontain">
                    <img v-for="item in rowpapergoods" :src="item.img" alt="" class="img">
                </div>
            </div>

            <!-- 推荐内容 -->
            <div class="famous">
                <!-- 后端重构后需要调整 -->
                <GoodsItem v-for="item in suggestgoods" :good="item" class="famousitem"></GoodsItem>
            </div>
        </div>

        <!-- 下半部分 -->
        <div class="normal">
            <!-- 后端重构后需要调整 -->
            <GoodsItem v-for="item in goods" :good="item" class="normalitem"></GoodsItem>
            <GoodsItem v-for="item in goods" :good="item" class="normalitem"></GoodsItem>
        </div>
    </div>
</template>

<style scoped>
    @import url(../../../css/HomePage.css);
</style>