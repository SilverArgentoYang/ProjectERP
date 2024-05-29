<script setup>
import { inject } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
    //inject
    const store = inject('store');

    //侧边栏
    store._backstage_sidebar(1,1);

    //路径
    store._addpath(1,'BKind','分类列表');

    //创建分类
    function createkind() {
        store._backstage_popovershow(true);
    }

    //浮动菜单内容
    const popover=[
        {
            type:'text',
            text:'分类名称',
            defualtvalue:''
        },
        {
            type:'texteara',
            text:'备注',
            defualtvalue:''
        }
    ];
</script>

<template>
    <div class="kindlistbody">
        <!-- 菜单 -->
        <div class="backblack" v-show="store.state.backstage_popovershow">
            <PopoverPanel class="popover" :inputs="popover" posturl=""></PopoverPanel>
        </div>

        <!-- 顶栏 -->
        <div class="banner">
            <form class="search" @submit.prevent="">
                <div class="text">分类名称</div>
                <input class="searchbox" type="text">
                <div class="searchbutton button">查询</div>
                <input type="submit" style="width: 0; height: 0;border: none;">
            </form>
            <div class="command">
                <div class="commandbutton createkind button" @click="createkind()">创建分类</div>
            </div>
        </div>
        <!-- 主体 -->
        <div class="bodymain">
            <table class="maintable">
                <thead>
                    <tr>
                        <th class="id">ID</th>
                        <th class="name">分类名称</th>
                        <th class="number">商品数量</th>
                        <th class="extext">备注</th>
                        <th class="time">创建时间</th>
                        <th class="command">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>000</td>
                        <td>童鞋</td>
                        <td>10</td>
                        <td>备注备注备注备注备注备注备注备注</td>
                        <td>2013-11-27</td>
                        <td class="command">
                            <div>
                                <div class="commandbutton change button">修改</div>
                                <div class="commandbutton delete button">弃用</div>
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
</style>