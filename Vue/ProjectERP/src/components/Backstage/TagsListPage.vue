<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
    //inject
    const store = inject('store');

    //侧边栏
    store._backstage_sidebar(1,3);

    //路径
    store._addpath(1,'BTags','标签列表');

    //浮动菜单内容
    const popover = ref([
        {
            type:'text',
            text:'标签',
            defualtvalue:''
        }
    ]);

    //请求数据
    const tabledata = ref([{
        id:'',
        name:'',
        count:'',
        time:['','',''],
        show:true
    }]);

    function _getdata() {
        axios({
            url:'/getTagsGoods',
            method:'get',
            params:{}
        }).then(res=>{
            tabledata.value.length=0;
            res.data.tags.forEach(item => {
                tabledata.value.push({
                    id:item.id,
                    name:item.name,
                    count:item.count,
                    time:[item.time[0],item.time[1],item.time[2]],
                    show:true
                })
            });
        });
    }
    _getdata();

    //创建标签
    const popoverkey = ref(['null',0]);
    const popoverposturl = ref('');
    function _createkind() {
        popoverposturl.value = '/postTagCreate';
        popoverkey.value[0] = 'create'
        popover.value[0].defualtvalue = '';
        store._backstage_popovershow(true);
    }

    //修改标签
    function _changekind(index) {
        var item = tabledata.value[index];
        popoverposturl.value = '/postTagChange';
        popoverkey.value[0] = 'change';
        popoverkey.value[1] = index;
        popover.value[0].defualtvalue = item.name;
        store._backstage_popovershow(true);
    }

    //弃用标签
    function _deletekind(index) {
        var r = confirm('是否确认删除');
        if(r) {
            axios({
                url:'/postTagDelete',
                method:'post',
                params:{
                    id:tabledata.value[index].id
                }
            }).then(res=>{
                if(res.data.success=='true') {
                    if(tabledata.value.length > 1) {
                        for(var i=index;i<tabledata.value.length-1;i++) {
                            tabledata.value[i] = tabledata.value[i+1];
                        }
                    }
                    tabledata.value.pop();
                }
            });
        }
    }

    //菜单提交
    function confirm(value) {
        if(value[0].replace(/\s*/g,"")!="") {
            if(popoverkey.value[0]=='create'){
                tabledata.value.push({
                    id:tabledata.value.length>0?Number(tabledata.value[tabledata.value.length-1].id)+1:0,
                    name:value[0],
                    count:'0',
                    time:[new Date().getFullYear(),('0' + (new Date().getMonth() + 1)).slice(-2),('0' + new Date().getDate()).slice(-2)],
                    show:true
                });
            }
            if(popoverkey.value[0]=='change'){
                tabledata.value[popoverkey.value[1]].name = value[0];
            }
        }else{
            store._showmessage('标签名称不能为空');
        }
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
                <div class="text">标签名称</div>
                <input class="searchbox" type="text" v-model="searchtext">
                <div class="searchbutton button" @click="_search(searchtext)">查询</div>
                <input type="submit" style="width: 0; height: 0;border: none;">
            </form>
            <div class="command">
                <div class="commandbutton createkind button" @click="_createkind()">创建标签</div>
            </div>
        </div>
        <!-- 主体 -->
        <div class="bodymain">
            <table class="maintable">
                <thead>
                    <tr>
                        <th class="id">ID</th>
                        <th class="name">标签名称</th>
                        <th class="number">使用数量</th>
                        <th class="time">创建时间</th>
                        <th class="command">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item,index in tabledata" v-show="item.show">
                        <td>{{ item.id }}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.count}}</td>
                        <td>{{item.time[0]}}-{{item.time[1]}}-{{item.time[2]}}</td>
                        <td class="command">
                            <div>
                                <div class="commandbutton change button" @click="_changekind(index)">修改</div>
                                <div class="commandbutton delete button" @click="_deletekind(index)">弃用</div>
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
        height: 50px;
    }
    .bodymain>.maintable .id {
        width: 70px;
    }
    .bodymain>.maintable .number {
        width: 280px;
    }
    .bodymain>.maintable .time {
        width: 250px;
    }
    .bodymain>.maintable .command {
        width: 250px;
    }
    @media only screen and (max-width: 1680px) {
        .bodymain>.maintable tr>td {
            height: 50rem;
        }
        .bodymain>.maintable .id {
            width: 70rem;
        }
        .bodymain>.maintable .number {
            width: 280rem;
        }
        .bodymain>.maintable .time {
            width: 250rem;
        }
        .bodymain>.maintable .command {
            width: 250rem;
        }
    }
</style>