<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
    //inject
    const store = inject('store');

    //侧边栏
    store._backstage_sidebar(1,2);

    //路径
    store._addpath(1,'BGood','商品列表');
    
    //浮动菜单内容
    const popover = ref([
        {
            type:'img',
            text:'商品图片',
            defualtvalue:''
        },
        {
            type:'text',
            text:'商品名称',
            defualtvalue:''
        },
        {
            type:'text',
            text:'商品价格',
            defualtvalue:''
        },
        {
            type:'text',
            text:'商品库存',
            defualtvalue:''
        },
        {
            type:'tags',
            text:'商品标签',
            defualtvalue:''
        },
        {
            type:'kind',
            text:'商品分类',
            defualtvalue:''
        },
    ]);

    //请求数据
    const tabledata = ref([{
        id:'',
        pic:'',
        name:'',
        price:'',
        count:'',
        sale:'',
        state:'',
        tags:[{
            id:'',
            name:''
        }],
        time:['','',''],
        kind:'',
        show:true
    }]);
    function _getdata() {
        axios({
            url:'/getGoodsMain',
            method:'get',
            params:{}
        }).then(res=>{
            tabledata.value.length=0;
            res.data.goods.forEach((item,index) => {
                tabledata.value.push({
                    id:item.id,
                    pic:item.img,
                    name:item.name,
                    price:item.realprice,
                    count:item.count,
                    sale:item.sale,
                    state:item.state,
                    tags:[],
                    time:[item.time[0],item.time[1],item.time[2]],
                    kind:item.kind,
                    show:true
                });
                item.tags.forEach(itemj => {
                    tabledata.value[index].tags.push({
                        id:itemj.id,
                        name:itemj.name
                    })
                });
            });
        });
    }
    _getdata();

    //拉取标签
    const tags = ref([]);
    function _gettags() {
        axios({
            url:'/getTagsGoods',
            method:'get',
            params:{}
        }).then(res=>{
            res.data.tags.forEach(item => {
                tags.value.push({
                    id:item.id,
                    name:item.name,
                    selected:false
                })
            });
        })
    }
    _gettags();

    //上架商品
    const popoverkey = ref(['null',0]);
    const popoverposturl = ref('');
    function _creategood() {
        popoverposturl.value = '/postGoodCreate';
        popoverkey.value[0] = 'create'
        popover.value[0].defualtvalue = '';
        popover.value[1].defualtvalue = '';
        popover.value[2].defualtvalue = '';
        popover.value[3].defualtvalue = '';
        popover.value[4].defualtvalue = '';
        popover.value[5].defualtvalue = '';
        store._backstage_popovershow(true);
    }

    //修改商品
    function _changegood(index) {
        var item = tabledata.value[index];
        popoverposturl.value = '/postGoodChange';
        popoverkey.value[0] = 'change';
        popoverkey.value[1] = index;
        popover.value[0].defualtvalue = item.pic;
        popover.value[1].defualtvalue = item.name;
        popover.value[2].defualtvalue = item.price;
        popover.value[3].defualtvalue = item.count;
        popover.value[4].defualtvalue = [].slice();
        item.tags.forEach(itemj => {
            popover.value[4].defualtvalue.push(itemj.id);
        });
        popover.value[5].defualtvalue = item.kind;
        store._backstage_popovershow(true);
    }

    //删除商品
    function _deletegood(index) {
        var r = confirm('是否确认删除');
        if(r) {
            axios({
                url:'/postGoodDelete',
                method:'post',
                params:{
                    id:tabledata.value[index].id
                }
            }).then(res=>{
                if(res.data.success=='true') {
                    tabledata.value[index].state = '已下架'
                }
            });
        }
    }

    //菜单提交
    function confirm(value) {
        if(value[1].replace(/\s*/g,"")!="") {
            var confirmtags = [];
            value[4].forEach(item => {
                tags.value.forEach(itemj => {
                    if(item==itemj.id){
                        confirmtags.push(itemj);
                    }
                });
            });
            if(popoverkey.value[0]=='create'){
                tabledata.value.push({
                    id:tabledata.value.length>0?Number(tabledata.value[tabledata.value.length-1].id)+1:0,
                    pic:value[0],
                    name:value[1],
                    price:value[2],
                    count:value[3],
                    sale:'0',
                    state:'在售',
                    tags:confirmtags,
                    time:[new Date().getFullYear(),('0' + (new Date().getMonth() + 1)).slice(-2),('0' + new Date().getDate()).slice(-2)],
                    kind:value[5],
                    show:true
                });
            }
            if(popoverkey.value[0]=='change'){
                tabledata.value[popoverkey.value[1]].pic = value[0];
                tabledata.value[popoverkey.value[1]].name = value[1];
                tabledata.value[popoverkey.value[1]].price = value[2];
                tabledata.value[popoverkey.value[1]].count = value[3];
                tabledata.value[popoverkey.value[1]].tags = confirmtags;
                tabledata.value[popoverkey.value[1]].kind = value[5];
            }
        }else{
            store._showmessage('商品名称不能为空');
        }
    }

    //重新上架
    function _resale(index) {
        axios({
            url:'/postGoodResale',
            method:'post',
            params:{
                id:tabledata.value[index].id
            }
        }).then(res=>{
            if(res.data.success=='true') {
                tabledata.value[index].state = '在售'
            }
        });
    }

    //查询
    const searchtext = ref('');
    function _search(text) {
        tabledata.value.forEach(item => {
            if(item.name.includes(text)) {
                item.show=true;
            }else{
                item.show=false;
            }
        });
    }

    //状态
    const state = ref('all');
    function _state() {
        switch(state.value) {
            case 'all' : {
                tabledata.value.forEach(item => {
                    item.show=true;
                });
            }break;
            case 'onsale' : {
                tabledata.value.forEach(item => {
                    if(item.state=='在售') {
                        item.show=true;
                    }else{
                        item.show=false;
                    }
                });
            }break;
            case 'deleted' : {
                tabledata.value.forEach(item => {
                    if(item.state=='已下架') {
                        item.show=true;
                    }else{
                        item.show=false;
                    }
                });
            }break;
        }
    }
</script>

<template>
    <div class="goodlistbody">
        <!-- 菜单 -->
        <div class="backblack" v-if="store.state.backstage_popovershow">
            <PopoverPanel class="popover" :inputs="popover" :posturl="popoverposturl" :key="popoverkey[0]" @confirm="confirm"></PopoverPanel>
        </div>

        <!-- 顶栏 -->
        <div class="banner">
            <form class="search" @submit.prevent="_search(searchtext)">
                <div class="text">商品名称</div>
                <input class="searchbox" type="text" v-model="searchtext">
                <div class="searchbutton button" @click="_search(searchtext)">查询</div>
                <input type="submit" style="width: 0; height: 0;border: none;">
            </form>
            <div class="text">商品状态</div>
            <select class="select" name="" id="" v-model="state" @change="_state()">
                <option value="all" selected>全部</option>
                <option value="onsale">在售</option>
                <option value="deleted">已下架</option>
            </select>
            <div class="command">
                <div class="commandbutton createkind button" @click="_creategood()">上架商品</div>
            </div>
        </div>
        <!-- 主体 -->
        <div class="bodymain">
            <table class="maintable">
                <thead>
                    <tr>
                        <th class="id">ID</th>
                        <th class="pic">商品图片</th>
                        <th class="name">商品名称</th>
                        <th class="price">商品价格</th>
                        <th class="count">商品库存</th>
                        <th class="sale">商品销量</th>
                        <th class="state">商品状态</th>
                        <th class="tags">商品标签</th>
                        <th class="time">创建时间</th>
                        <th class="command">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item,index in tabledata" v-show="item.show">
                        <td class="id">{{item.id}}</td>
                        <td class="pic"><img class="picimg" :src="item.pic" alt=""></td>
                        <td class="name">{{item.name}}</td>
                        <td class="price">{{item.price}}</td>
                        <td class="count">{{item.count}}</td>
                        <td class="sale">{{item.sale}}</td>
                        <td class="state">{{item.state}}</td>
                        <td class="tags">
                            <div class="tagitem" v-for="itemj in item.tags">{{ itemj.name }}</div>
                        </td>
                        <td class="time">{{item.time[0]}}-{{item.time[1]}}-{{item.time[2]}}</td>
                        <td class="command">
                            <div>
                                <div class="commandbutton change button" @click="_changegood(index)">修改</div>
                                <div class="commandbutton delete button" @click="_deletegood(index)" v-show="item.state=='在售'">下架</div>
                                <div class="commandbutton delete button" @click="_resale(index)" v-show="item.state=='已下架'">上架</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
    
<style scoped>
    @import url(../../css/Backstage/KindListPage.css);
    .bodymain>.maintable tr>td {
        height: 200px;
    }
    .bodymain>.maintable .id {
        width: 50px;
    }
    .bodymain>.maintable .pic {
        width: 140px;
    }
    .bodymain>.maintable .price {
        width: 120px;
    }
    .bodymain>.maintable .count {
        width: 110px;
    }
    .bodymain>.maintable .sale {
        width: 110px;
    }
    .bodymain>.maintable .state {
        width: 110px;
    }
    .bodymain>.maintable .tags {
        width: 140px;
    }
    .bodymain>.maintable .time {
        width: 120px;
    }
    .bodymain>.maintable .command {
        width: 200px;
    }
    .tagitem {
        width: 50px;
        height: 30px;
        padding: 0 25px;
        border: 1px dashed var(--colorgrey);
        border-radius: 15px;
        line-height: 30px;
        text-align: center;
        font-size: 15px;
        margin: 5px auto;
    }
    .picimg {
        width: 100px;
        height: 100px;
        margin: auto;
        object-fit:cover;
    }
    @media only screen and (max-width: 1680px) {
        .bodymain>.maintable tr>td {
            height: 200rem;
        }
        .bodymain>.maintable .id {
            width: 50rem;
        }
        .bodymain>.maintable .pic {
            width: 140rem;
        }
        .bodymain>.maintable .price {
            width: 120rem;
        }
        .bodymain>.maintable .count {
            width: 110rem;
        }
        .bodymain>.maintable .sale {
            width: 110rem;
        }
        .bodymain>.maintable .state {
            width: 110rem;
        }
        .bodymain>.maintable .tags {
            width: 140rem;
        }
        .bodymain>.maintable .time {
            width: 120rem;
        }
        .bodymain>.maintable .command {
            width: 200rem;
        }
        .tagitem {
            width: 50rem;
            height: 30rem;
            padding: 0 25rem;
            border-radius: 15rem;
            line-height: 30rem;
            font-size: 15rem;
            margin: 5rem auto;
        }
        .picimg {
            width: 100rem;
            height: 100rem;
        }
    }
</style>