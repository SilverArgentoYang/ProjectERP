<script setup>
    //VUE引用
    import { inject, ref } from 'vue';

    // components
    import GoodsItem from './../GoodsItem.vue'
    
    // 自定义声明
    const {
        right_arrow,
        left_arrow,
        up_arrow,
        down_arrow,
        searchresualt,
        tags
    }=inject('resource');

    //路由传参
    const props = defineProps({
        title:{
            type:String,
            default:"全部"
        }
    })

    //页码
    const pagetotal = ref(parseInt(searchresualt.length / 15)+1);
    const page = ref(1);
    //下一页上一页
    function _pageup() {
        if(this.page < this.pagetotal) {
            this.page += 1;
        }
    }
    function _pagedown() {
        if(this.page > 1) {
            this.page -= 1;
        }
    }
</script>

<template>
    <div class="kindpagebody">
        <div class="toolsbar">
            <!-- 标题 -->
            <div class="title">{{title}}:</div>

            <!-- 标签 -->
            <div class="tags">
                <div v-for="item in tags" class="tag">{{item.name}}</div>
            </div>

            <div class="cutline"></div>

            <!-- 选项 -->
            <div class="options">
                <div class="left">
                    <div class="option1">综合排序</div>
                    <div class="option1">销量</div>
                    <div class="option1">新品</div>
                    <div class="option1">收藏</div>
                    <div class="option1">
                        价格
                        <div>
                            <Icons class="upanddown"><up_arrow /></Icons>
                            <Icons class="upanddown"><down_arrow /></Icons>
                        </div>
                    </div>
                    <div class="option2">
                        <div class="inputbox">￥<input class="input" type="text" maxlength="9"></div>
                        -
                        <div class="inputbox">￥<input class="input" type="text" maxlength="9"></div>
                    </div>
                </div>

                <div class="right">
                    {{page}}/{{pagetotal}}
                    <Icons :class="'leftandright button'+(page==1?'':' enable')" @click="_pagedown()"><left_arrow /></Icons>
                    <Icons :class="'leftandright button'+(page==pagetotal?'':' enable')" @click="_pageup()"><right_arrow /></Icons>
                </div>
            </div>
        </div>
        <div class="itemlist">
            <!-- 下半部分 -->
            <GoodsItem v-for="item in searchresualt.slice((page-1)*15,page*15)" :good="item" class="normalitem"></GoodsItem>
        </div>
    </div>
</template>

<style scoped>
    @import url(../../../css/KindPage.css);
</style>