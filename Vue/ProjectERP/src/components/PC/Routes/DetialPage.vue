<script setup>
    // import
    import { inject,markRaw,ref,shallowRef } from 'vue';
import GoodsItem from './../GoodsItem.vue'
import axios from 'axios';

    //store
    const store = inject('store');

    //资源载入
    const {
        favorite2,
        share,
        up_arrow,
        down_arrow,
        like,
        reply
    }=inject('resource');

    //路由传入
    const props = defineProps({
        goodid:{
            type:String,
            default:""
        },
    });
    //添加历史记录
    function _addhistory() {
        axios({
            url:'addhistory',
            method:'post',
            params:{
                userid:localStorage.getItem('user'),
                goodid:props.goodid
            }
        })
    }
    _addhistory();
    //读取商品信息
    const good = ref({
        id:'',
        isfavorite:false,
        imgs:[""],
        name:"Undefined",
        salecount:"Undefined",
        realprice:"Undefined",
        fakeprice:"Undefined",
        class:[
            {
                id:'',
                name:"Undefined",
                img:""
            }
        ],
        detialimg:[""]
    });
    axios({
        url:'/good',
        method:'get',
        params:{
            goodid:props.goodid
        }
    }).then(res=> {
        good.value.id = props.goodid;
        good.value.isfavorite = res.data.good.isfavorite;
        good.value.imgs = res.data.good.imgs.slice();
        good.value.name = res.data.good.name;
        good.value.salecount = res.data.good.salecount;
        good.value.realprice = res.data.good.realprice;
        good.value.fakeprice = res.data.good.fakeprice;
        good.value.class = res.data.good.class.slice();
        good.value.detialimg = res.data.good.detialimg.slice();
    }).catch(err=>{
        console.log(err);
    });

    //获取用户信息
    const user = ref({
        userid:'',
        address:[{
            id:'',
            name:'',
            address:'',
            phone:''
        }]
    });
    user.value.userid = localStorage.getItem('user');
    if(!store.state.user_islogin) {
        user.value.address[0] = '请登录';
    }else{
        axios({
            url:'/user',
            method:'get',
            params:{
                userid:localStorage.getItem('user')
            }
        }).then(res=> {
            user.value.address = res.data.user.address.slice();
        }).catch(err=>{
            console.log(err);
        });
    }

    //获取评论信息
    const commentstype = ref('all');
    const commentsort = ref('nature');
    const comments = ref([
        {
            commentid:'',
            user:{
                userid:'',
                username:"Undefined",
                img:""
            },
            info:{
                time:"Undefined",
                boughtclass:"Undefined"
            },
            text:"Undefined"
        }
    ]);
    axios({
        url:'/comments',
        method:'get',
        params:{
            userid:localStorage.getItem('user'),
            goodid:props.goodid,
            type:commentstype.value,
            sort:commentsort.value
        }
    }).then(res=>{
        comments.value = res.data.comments.slice();
    }).catch(err=>{
        console.log(err);
    });

    //获取推荐商品
    const suggestgoods = ref([
        {
            id:"",
            img:"",
            fakeprice:"Undefined",
            realprice:"Undefined",
            name : "Undefined"
        }
    ]);
    axios({
        url:'/goods',
        method:'get',
        params:{
            type:'suggesttengoods'
        }
    }).then((res)=>{
        suggestgoods.value = res.data.goods.slice();
    }).catch(err=>{
        console.log(err);
    });

    //更换图片
    const largeimgid = ref(0);
    function _changeimg(imgid) {
        largeimgid.value = imgid;
    }

    //扩大地址选框
    const addresslarge = ref(false);
    const addressarrow = shallowRef(new Object);
    addressarrow.value = down_arrow;
    function _addresslarge() {
        if(!addresslarge.value) {
            addresslarge.value = true;
            addressarrow.value = up_arrow;
        }else{
            addresslarge.value = false;
            addressarrow.value = down_arrow;
        }
    }

    //选择地址
    const addresschoose = ref(0);
    function _addresschoose(addressid) {
        if(addressid < user.value.address.length && addresslarge.value) {
            addresschoose.value = addressid;
            const temp = user.value.address[addressid];
            for(var i = addressid; i > 0; i--) {
                user.value.address[i] = user.value.address[i-1];
            }
            user.value.address[0] = temp;
            _addresslarge();
        }else if(addressid < user.value.address.length){
            _addresslarge();
        }
    }

    //扩大颜色分类选框
    const typelarge = ref(false);
    const typearrow = shallowRef(new Object);
    typearrow.value = down_arrow;
    function _typelarge() {
        if(!typelarge.value) {
            typelarge.value = true;
            typearrow.value = up_arrow;
        }else{
            typelarge.value = false;
            typearrow.value = down_arrow;
        }
    }

    //选择颜色分类
    const typechoose = ref(0);
    function _typechoose(typeid) {
        typechoose.value = typeid;
    }

    //收藏
    function _changefavorite() {
        if(!good.value.isfavorite) {
            axios({
                url:'/addfavorite',
                method:'post',
                params:{
                    userid:localStorage.getItem('user'),
                    goodid:good.value.id
                }
            }).then(res =>{
                good.value.isfavorite = true;
            }).catch(err=>{
                console.log(err);
            });
        }else{
            axios({
                url:'/removefavorite',
                method:'post',
                params:{
                    userid:localStorage.getItem('user'),
                    goodid:[good.value.id]
                }
            }).then(res =>{
                good.value.isfavorite = false;
            }).catch(err=>{
                console.log(err);
            });
        }
    }

    //分享
    function _copyurl() {
        navigator.clipboard.writeText(window.location.href).then(
            function() {
                store._showmessage('链接复制成功');
            },
            function() {
                store._showmessage('链接复制失败');
            }
        )
    }

    //添加购物车
    function _addcart() {
        if(!good.value.iscart) {
            axios({
                url:'/addcart',
                method:'post',
                params:{
                    userid:localStorage.getItem('user'),
                    goodid:good.value.id
                }
            }).then(res =>{
                good.value.iscart = true;
            }).catch(err=>{
                console.log(err);
            });
        }else{
            store._showmessage('已在购物车中');
        }
    }

    //评论筛选排序
    function _changecomments(type, sort) {
        if(commentstype.value != type || commentsort.value != sort){
            commentstype.value = type;
            commentsort.value = sort;
            axios({
                url:'/comments',
                method:'get',
                params:{
                    goodid:props.goodid,
                    type:commentstype.value,
                    sort:commentsort.value
                }
            }).then(res=>{
                comments.value = res.data.comments.slice();
            }).catch(err=>{
                console.log(err);
            });
        }
    }

    //评论排序展开
    const commentsortoptions = ref([{
        name:'nature',
        text:'默认排序'
    },
    {
        name:'time',
        text:'最近评论'
    },
    {
        name:'like',
        text:'点赞数优先'
    },
    {
        name:'comment',
        text:'评论数优先'
    }])
    const commentsortlarge = ref(false);
    const commentsortarrow = shallowRef(new Object);
    commentsortarrow.value = down_arrow;
    function _commentsortlarge() {
        if(!commentsortlarge.value) {
            commentsortlarge.value = true;
            commentsortarrow.value = up_arrow;
        }else{
            commentsortlarge.value = false;
            commentsortarrow.value = down_arrow;
        }
    }

    //评论排序选择
    function _choosecommentsort(sortid) {
        if(sortid < commentsortoptions.value.length && commentsortlarge.value) {
            const temp = commentsortoptions.value[sortid];
            for(var i = sortid; i > 0; i--) {
                commentsortoptions.value[i] = commentsortoptions.value[i-1];
            }
            commentsortoptions.value[0] = temp;
            _changecomments(commentstype.value,commentsortoptions.value[0].name);
            _commentsortlarge();
        }else if(sortid < commentsortoptions.value.length){
            _commentsortlarge();
        }
    }

    //点赞评论
    function _likecomment(commentid,index) {
        if(!comments.value[index].isliked) {
            axios({
                url:'/likecomment',
                method:'post',
                params:{
                    userid:localStorage.getItem('user'),
                    commentid:commentid
                }
            }).then(res=>{
            });
            comments.value[index].isliked = true;
        }else{
            axios({
                url:'/dislikecomment',
                method:'post',
                params:{
                    userid:localStorage.getItem('user'),
                    commentid:commentid
                }
            }).then(res=>{
            });
            comments.value[index].isliked = false;
        }
    }

    //回复评论
    const isreplying = ref(-1);
    const replytext = ref('')
    function _showreplybox(index) {
        if(isreplying.value != index) {
            isreplying.value = index;
        }else {
            isreplying.value = -1;
        }
        replytext.value = '';
    }
    function _replysent(commentid) {
        if(replytext.value != '') {
            axios({
                url:'/replycomment',
                method:'post',
                params:{
                    userid:localStorage.getItem('user'),
                    commentid:commentid
                }
            }).then(res=>{
            });
            isreplying.value = -1;
            replytext.value = '';
        }
    }
</script>

<template>
    <div class="detialbody">
        <!-- 头部 -->
        <div class="detialhead">
            <!-- 图片 -->
            <div class="imgs">
                <div class="large"><img :src="good.imgs[largeimgid]" alt=""></div>
                <div class="minis">
                    <img class="button" v-for="item,index in good.imgs" :src="item" alt="" @click="_changeimg(index)">
                </div>
            </div>
            <div class="controlpad">
                <div class="info">
                    <!-- 标题 -->
                    <div class="titleandshare">
                        <div class="title">{{good.name}}</div>
                        <div class="share">
                            <Icons :class="{
                                icon:true,
                                button:true,
                                isfavorite:good.isfavorite
                            }"
                            @click="_changefavorite()"
                            ><favorite2 /></Icons>
                            <Icons class="icon button" @click="_copyurl()"><share /></Icons>
                        </div>
                    </div>
                    <div class="subtitle">月销：{{good.salecount}}</div>
                    <!-- 价格 -->
                    <div class="price">
                        <div class="realprice">￥{{good.realprice}}</div>
                        <div class="fakeprice">￥{{good.fakeprice}}</div>
                    </div>
                </div>
                <!-- 地址 -->
                <div :class="{address:true,largebox:addresslarge}">
                    <div style="width: 100px;">配送地址：</div>
                    <div class="textbox">
                        <div class="text button"
                            v-for="item,index in user.address"
                            @click="_addresschoose(index)"
                        >{{item.address}}</div>
                    </div>
                    <Icons class="icon button" @click="_addresslarge()"><addressarrow /></Icons>
                </div>
                <!-- 选择颜色分类 -->
                <div :class="{typechoose:true,largebox:typelarge}">
                    <div class="list">
                        <div style="width: 100%;height: 30px;line-height: 20px;">颜色分类：</div>
                        <div style="display: flex;flex-wrap: wrap;gap: 10px;">
                            <div :class="{
                                listitem:true,
                                button:true,
                                typechoosing:typechoose==index
                            }"
                                v-for="item,index in good.class"
                                @click="_typechoose(index)"
                            >
                                <img :src="item.img" alt="" class="img">
                                <div class="text">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                    <Icons class="icon button" @click="_typelarge()"><typearrow /></Icons>
                </div>
                <!-- 购买 -->
                <div class="buynsave">
                    <div class="buy">立即购买</div>
                    <div class="save button" @click="_addcart()">加入购物车</div>
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
                <div :class="{
                    filter:true,
                    button:true,
                    typechoosing:commentstype=='all'
                }" @click="_changecomments('all',commentsort)">全部</div>
                <div :class="{
                    filter:true,
                    button:true,
                    typechoosing:commentstype=='img'
                }" @click="_changecomments('img',commentsort)">有图</div>
                <div :class="{
                    sort:true,
                    largebox:commentsortlarge
                }">
                    <div class="textbox">
                        <div class="text button" v-for="item,index in commentsortoptions"
                            @click="_choosecommentsort(index)"
                        >{{item.text}}</div>
                    </div>
                    <Icons class="icon button" @click="_commentsortlarge()"><commentsortarrow /></Icons>
                </div>
            </div>
            <!-- 评论内容 -->
            <div v-for="item,index in comments" class="item">
                <div class="cutline"></div>
                <div class="user">
                    <img :src="item.user.img" alt="" class="useravator">
                    <div>
                        <div class="username">{{item.user.username}}</div>
                        <div class="cominfo">{{item.info.time}} {{item.info.boughtclass}}</div>
                    </div>
                </div>
                <div class="context">{{item.text}}</div>
                <div style="margin-left: 70px;display: flex;gap: 10px;" v-if="item.img">
                    <img class="img" :src="itemimg" alt="" v-for="itemimg in item.img">
                </div>
                <div class="active">
                    <Icons :class="{
                        icon :true,
                        like :true,
                        button :true,
                        red :item.isliked
                    }"
                        @click="_likecomment(item.commentid,index)"
                    ><like /></Icons>
                    <Icons class="icon reply button"
                        style="fill: var(--colorred);"
                        @click="_showreplybox(index)"
                    ><reply /></Icons>
                </div>
                <div class="childcomments">
                    <div class="childcommentitembox" v-for="childitem,index in item.childcomments">
                        <div class="childcommentitem">
                            <div class="childusername">{{ childitem.user.username }}：</div>
                            <div class="childcontext">{{ childitem.text }}</div>
                        </div>
                        <div class="cutline" v-if="index < item.childcomments.length-1"></div>
                    </div>
                </div>
                <div class="replying" v-show="isreplying == index">
                    <input type="text" v-model="replytext">
                    <div class="submitereply button" @click="_replysent(item.commentid)">发 表</div>
                </div>
            </div>
        </div>

        <!-- 推荐商品 -->
        <div class="more">
            <div class="title">推荐商品</div>
            <div class="list">
                <GoodsItem v-for="item in suggestgoods" :good="item"></GoodsItem>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url(../../../css/DetialPage.css);
</style>