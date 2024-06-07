<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
    //inject
    const store = inject('store');

    //侧边栏
    store._backstage_sidebar(3,6);

    //路径
    store._addpath(1,'BDepartment','部门管理');

    //浮动菜单内容
    const popover = ref([
        {
            type:'text',
            text:'分类名称',
            defualtvalue:''
        },
        {
            type:'ability',
            text:'部门职能',
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
        ability:[{
            id:'',
            name:''
        }],
        member:[],
        note:'',
        time:['','',''],
        show:true
    }]);

    function _getdata() {
        axios({
            url:'/getDepartment',
            method:'get',
            params:{}
        }).then(res=>{
            tabledata.value.length=0;
            res.data.department.forEach((item,index) => {
                tabledata.value.push({
                    id:item.id,
                    name:item.name,
                    ability:[],
                    member:[],
                    note:item.note,
                    time:[item.time[0],item.time[1],item.time[2]],
                    show:true
                });
                item.ability.forEach(itemj => {
                    tabledata.value[index].ability.push({
                        id:itemj.id,
                        name:itemj.name
                    });
                });
                item.member.forEach(itemj => {
                    tabledata.value[index].member.push(itemj);
                });
            });
        });
    }
    _getdata();

    //创建部门
    const popoverkey = ref(['null',0]);
    const popoverposturl = ref('');
    function _createkind() {
        popoverposturl.value = '/postDepartmentCreate';
        popoverkey.value[0] = 'create'
        popover.value[0].defualtvalue = '';
        popover.value[1].defualtvalue = '';
        popover.value[2].defualtvalue = '';
        store._backstage_popovershow(true);
    }

    //修改部门
    function _changekind(index) {
        var item = tabledata.value[index];
        popoverposturl.value = '/postDepartmentChange';
        popoverkey.value[0] = 'change';
        popoverkey.value[1] = index;
        popover.value[0].defualtvalue = item.name;
        popover.value[1].defualtvalue = [].slice();
        item.ability.forEach(itemj => {
            popover.value[1].defualtvalue.push(itemj.id);
        });
        popover.value[2].defualtvalue = item.note;
        store._backstage_popovershow(true);
    }

    //撤销部门
    function _deletekind(index) {
        var r = confirm('是否确认删除');
        if(r) {
            axios({
                url:'/postDepartmentDelete',
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

    //部门职能
    const ability = ref([]);
    function _getability() {
        axios({
            url:'/getDepartmentAbility',
            method:'get',
            params:{}
        }).then(res=>{
            res.data.ability.forEach(item => {
                ability.value.push({
                    id:item.id,
                    name:item.name
                })
            });
        });
    }
    _getability();

    //菜单提交
    function emitconfirm(value) {
        if(value[0].replace(/\s*/g,"")!="") {
            var confirmability = [];
            if(value[1] != '') {
                value[1].forEach(item => {
                    ability.value.forEach(itemj => {
                        if(item==itemj.id){
                            confirmability.push(itemj);
                        }
                    });
                });
            }
            if(popoverkey.value[0]=='create'){
                tabledata.value.push({
                    id:tabledata.value.length>0?Number(tabledata.value[tabledata.value.length-1].id)+1:0,
                    name:value[0],
                    ability:confirmability.slice(),
                    member:[],
                    note:value[2],
                    time:[new Date().getFullYear(),('0' + (new Date().getMonth() + 1)).slice(-2),('0' + new Date().getDate()).slice(-2)],
                    show:true
                });
            }
            if(popoverkey.value[0]=='change'){
                tabledata.value[popoverkey.value[1]].name = value[0];
                tabledata.value[popoverkey.value[1]].ability = confirmability.slice();
                tabledata.value[popoverkey.value[1]].note = value[2];
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
            <PopoverPanel class="popover" :inputs="popover" :posturl="popoverposturl" :key="popoverkey[0]" @confirm="emitconfirm"></PopoverPanel>
        </div>

        <!-- 顶栏 -->
        <div class="banner">
            <form class="search" @submit.prevent="_search(searchtext)">
                <div class="text">部门名称</div>
                <input class="searchbox" type="text" v-model="searchtext">
                <div class="searchbutton button" @click="_search(searchtext)">查询</div>
                <input type="submit" style="width: 0; height: 0;border: none;">
            </form>
            <div class="command">
                <div class="commandbutton createkind button" @click="_createkind()">创建部门</div>
            </div>
        </div>
        <!-- 主体 -->
        <div class="bodymain">
            <table class="maintable">
                <thead>
                    <tr>
                        <th class="id">ID</th>
                        <th class="name">部门名称</th>
                        <th class="ability">部门职能</th>
                        <th class="member">部门成员</th>
                        <th class="note">备注</th>
                        <th class="time">创建时间</th>
                        <th class="command">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item,index in tabledata" v-show="item.show">
                        <td>{{ item.id }}</td>
                        <td>{{item.name}}</td>
                        <td>
                            <span class="abilityitem" v-for="itemj in item.ability">{{ itemj.name }}、</span>
                        </td>
                        <td>
                            <span class="memberitem" v-for="itemj in item.member">{{ itemj }}、</span>
                        </td>
                        <td>{{ item.note }}</td>
                        <td>{{item.time[0]}}-{{item.time[1]}}-{{item.time[2]}}</td>
                        <td class="command">
                            <div>
                                <div class="commandbutton change button" @click="_changekind(index)">修改</div>
                                <div class="commandbutton delete button" @click="_deletekind(index)">撤销部门</div>
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
        height: 120px;
    }
    .bodymain>.maintable .id {
        width: 70px;
    }
    .bodymain>.maintable .name {
        width: 130px;
    }
    .bodymain>.maintable .ability {
        width: 300px;
    }
    .bodymain>.maintable .member {
        width: 330px;
    }
    .bodymain>.maintable .time {
        width: 140px;
    }
    .bodymain>.maintable .command {
        width: 220px;
    }
    @media only screen and (max-width: 1680px) {
        .bodymain>.maintable tr>td {
            height: 120rem;
        }
        .bodymain>.maintable .id {
            width: 70rem;
        }
        .bodymain>.maintable .name {
            width: 130rem;
        }
        .bodymain>.maintable .ability {
            width: 300rem;
        }
        .bodymain>.maintable .member {
            width: 330rem;
        }
        .bodymain>.maintable .time {
            width: 140rem;
        }
        .bodymain>.maintable .command {
            width: 220rem;
        }
    }
</style>