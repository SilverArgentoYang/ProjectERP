<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
    //inject
    const store = inject('store');

    //侧边栏
    store._backstage_sidebar(1,1);

    //路径
    store._addpath(1,'BKind','分类列表');

    //浮动菜单内容
    const popover = ref([
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
    ]);

    //请求数据
    const tabledata = ref([{
        id:'',
        name:'',
        count:'',
        note:'',
        time:['','',''],
        show:true
    }]);

    function _getdata() {
        axios({
            url:'/getLabelsNav',
            method:'get',
            params:{}
        }).then(res=>{
            tabledata.value = res.data.nav_labels.slice();
        });
    }
    _getdata();

    //创建分类
    const popoverkey = ref(['null',0]);
    const popoverposturl = ref('');
    function _createkind() {
        popoverposturl.value = '/postLabelCreate';
        popoverkey.value[0] = 'create'
        popover.value[0].defualtvalue = '';
        popover.value[1].defualtvalue = '';
        store._backstage_popovershow(true);
    }

    //修改分类
    function _changekind(index,name,note) {
        popoverposturl.value = '/postLabelChange';
        popoverkey.value[0] = 'change';
        popoverkey.value[1] = index;
        popover.value[0].defualtvalue = name;
        popover.value[1].defualtvalue = note;
        store._backstage_popovershow(true);
    }

    //弃用分类
    function _deletekind(index) {
        axios({
            url:'/postLabelDelete',
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

    //菜单提交
    function confirm(value) {
        if(value[0].replace(/\s*/g,"")!="") {
            if(popoverkey.value[0]=='create'){
                tabledata.value.push({
                    id:tabledata.value.length>0?Number(tabledata.value[tabledata.value.length-1].id)+1:0,
                    name:value[0],
                    count:'0',
                    note:value[1],
                    time:[new Date().getFullYear(),('0' + (new Date().getMonth() + 1)).slice(-2),('0' + new Date().getDate()).slice(-2)],
                    show:true
                });
            }
            if(popoverkey.value[0]=='change'){
                tabledata.value[popoverkey.value[1]].name = value[0];
                tabledata.value[popoverkey.value[1]].note = value[1];
            }
        }else{
            store._showmessage('分类名称不能为空');
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
                <div class="text">分类名称</div>
                <input class="searchbox" type="text" v-model="searchtext">
                <div class="searchbutton button" @click="_search(searchtext)">查询</div>
                <input type="submit" style="width: 0; height: 0;border: none;">
            </form>
            <div class="command">
                <div class="commandbutton createkind button" @click="_createkind()">创建分类</div>
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
                    <tr v-for="item,index in tabledata" v-show="item.show">
                        <td>{{ item.id }}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.count}}</td>
                        <td>{{ item.note }}</td>
                        <td>{{item.time[0]}}-{{item.time[1]}}-{{item.time[2]}}</td>
                        <td class="command">
                            <div>
                                <div class="commandbutton change button" @click="_changekind(index,item.name,item.note)">修改</div>
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
</style>