<script setup>
    // components
    import { inject } from 'vue';
import GoodsItem from './../GoodsItem.vue'

    //资源载入
    const {
        favorite2,
        share,
        down_arrow,
        like,
        reply
    }=inject('resource');

    //路由传入
    // const props = defineProps({
    //     good:{
    //         type:Object,
    //         default:{
    //             imgs:[""],
    //             name:"Undefined",
    //             sale:"Undefined",
    //             realprice:"Undefined",
    //             fakeprice:"Undefined",
    //             class:[
    //                 {
    //                     name:"Undefined",
    //                     img:""
    //                 }
    //             ],
    //             detialimg:[""]
    //         }
    //     },
    //     user:{
    //         type:Object,
    //         default:{
    //             address:["Undefined"]
    //         }
    //     },
    //     comments:{
    //         type:Array,
    //         default:[
    //             {
    //                 user:{
    //                     username:"Undefined",
    //                     img:""
    //                 },
    //                 info:{
    //                     time:"Undefined",
    //                     bought:"Undefined"
    //                 },
    //                 text:"Undefined"
    //             }
    //         ]
    //     }
    // });
</script>

<template>
    <div class="detialbody">
        <!-- 头部 -->
        <div class="detialhead">
            <!-- 图片 -->
            <div class="imgs">
                <div class="large"><img src="" alt=""></div>
                <div class="minis">
                    <img v-for="item in good.imgs" :src="item" alt="">
                </div>
            </div>
            <div class="controlpad">
                <div class="info">
                    <!-- 标题 -->
                    <div class="titleandshare">
                        <div class="title">{{good.name}}</div>
                        <div class="share">
                            <Icons class="icon"><favorite2 /></Icons>
                            <Icons class="icon"><share /></Icons>
                        </div>
                    </div>
                    <div class="subtitle">月销：{{good.sale}}</div>
                    <!-- 价格 -->
                    <div class="price">
                        <div class="realprice">￥{{good.realprice}}</div>
                        <div class="fakeprice">￥{{good.fakeprice}}</div>
                    </div>
                </div>
                <!-- 地址 -->
                <div class="address">
                    <div class="text">配送地址：{{user.address[0]}}</div>
                    <Icons class="icon"><down_arrow /></Icons>
                </div>
                <!-- 选择颜色分类 -->
                <div class="typechoose">
                    <div class="list">
                        <div style="width: 100%;height: 30px;line-height: 20px;">颜色分类：</div>
                        <div style="display: flex;flex-wrap: wrap;gap: 10px;">
                            <div v-for="item in good.class" class="listitem">
                                <img :src="item.img" alt="" class="img">
                                <div class="text">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                    <Icons class="icon"><down_arrow /></Icons>
                </div>
                <!-- 购买 -->
                <div class="buynsave">
                    <div class="buy">立即购买</div>
                    <div class="save">加入购物车</div>
                </div>
            </div>
        </div>

        <!-- 商品描述 -->
        <div class="detialmain">
            <div class="title">商品详情</div>
            <img v-for="item in good.detialimg" :src="item" alt="" class="img">
        </div>

        <!-- 温馨提醒 -->
        <div class="warning">
            <p>价格说明</p>
            <p>划线价格</p>
            <p>商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</p>
            <p>未划线价格</p>
            <p>商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</p>
            <p>商家详情页(含主图) 以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。</p>
            <p>此说明仅当出现价格比较时有效，具体请参见《淘宝价格发布规范》。若商家单独对划线价格进行说明的，以商家的表述为准。</p>
        </div>
        <div class="cl"> 
            <div class="cutline"></div>
        </div>

        <!-- 评论 -->
        <div class="comment">
            <div class="title">商品评价</div>
            <!-- 筛选排序 -->
            <div class="filternsort">
                <div class="filter">全部</div>
                <div class="filter">有图</div>
                <div class="sort">
                    <div class="text">默认排序</div>
                    <Icons class="icon"><down_arrow /></Icons>
                </div>
            </div>
            <!-- 评论内容 -->
            <div v-for="item in comments" class="item">
                <div class="cutline"></div>
                <div class="user">
                    <img :src="item.user.img" alt="" class="useravator">
                    <div>
                        <div class="username">{{item.user.username}}</div>
                        <div class="cominfo">{{item.info.time}} {{item.info.bought}}</div>
                    </div>
                </div>
                <div class="context">{{item.text}}</div>
                <div class="active">
                    <Icons class="icon like"><like /></Icons>
                    <Icons class="icon reply"><reply /></Icons>
                </div>
            </div>
        </div>

        <!-- 推荐商品 -->
        <div class="more">
            <div class="title">推荐商品</div>
            <div class="list">
                <!-- 后端重构后需要调整 -->
                <GoodsItem v-for="item in 10"></GoodsItem>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url(../../../css/DetialPage.css);
</style>