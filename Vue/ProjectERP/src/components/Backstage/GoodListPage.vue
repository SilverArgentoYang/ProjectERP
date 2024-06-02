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
        sale:'',
        state:'',
        tags:[{
            id:'',
            name:''
        }],
        time:['','',''],
        show:true
    }]);
</script>

<template>
    <div class="kindlistbody">
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
            <select class="select" name="" id="">
                <option value="all" selected>全部</option>
                <option value="onsale">在售</option>
                <option value="deleted">已下架</option>
            </select>
            <div class="command">
                <div class="commandbutton createkind button" @click="">上架商品</div>
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
                                <div class="commandbutton change button" @click="_changekind(index,item.name,item.note)">修改</div>
                                <div class="commandbutton delete button" @click="_deletekind(index)">下架</div>
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