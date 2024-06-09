<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
//inject
const store = inject('store');

//侧边栏
store._backstage_sidebar(3,8);

//路径
store._addpath(1,'BUser','会员管理');

//浮动菜单内容
const popover = ref([
  {
    type:'text',
    text:'昵称',
    defualtvalue:''
  },
  {
    type:'text',
    text:'联系方式',
    defualtvalue:''
  }
]);

//请求数据
const tabledata = ref([{
  id:'',
  name:'',
  state:'',
  deal:'',
  count:'',
  phone:'',
  address:'',
  time:['','',''],
  show:true
}]);

function _getdata() {
  axios({
    url:'/getUserAll',
    method:'get',
    params:{}
  }).then(res=>{
    tabledata.value.length=0;
    res.data.users.forEach(item => {
      tabledata.value.push({
        id:item.id,
        name:item.name,
        state:item.state,
        deal:item.deal,
        count:item.count,
        phone:item.phone,
        address:item.address,
        time:[item.time[0],item.time[1],item.time[2]],
        show:true
      })
    });
  });
}
_getdata();

const popoverkey = ref(['null',0]);
const popoverposturl = ref('');
//修改用户
function _changekind(index) {
  var item = tabledata.value[index];
  popoverposturl.value = '/postUserChange';
  popoverkey.value[0] = 'change';
  popoverkey.value[1] = index;
  popover.value[0].defualtvalue = item.name;
  popover.value[1].defualtvalue = item.phone;
  store._backstage_popovershow(true);
}

//拉黑用户
function _deletekind(index) {
  var r = confirm('是否确认加入黑名单');
  if(r) {
    axios({
      url:'/postUserDelete',
      method:'post',
      params:{
        id:tabledata.value[index].id
      }
    }).then(res=>{
      if(res.data.success=='true') {
        tabledata.value[index].state = '黑名单'
      }
    });
  }
}

//恢复正常
function _resale(index) {
  var r = confirm('是否确认移除黑名单');
  if(r) {
    axios({
      url: '/postUserRenormal',
      method: 'post',
      params: {
        id: tabledata.value[index].id
      }
    }).then(res => {
      if (res.data.success == 'true') {
        tabledata.value[index].state = '正常'
      }
    });
  }
}

//菜单提交
function emitconfirm(value) {
  if(value[0].replace(/\s*/g,"")!="") {
    if(popoverkey.value[0]=='change'){
      tabledata.value[popoverkey.value[1]].name = value[0];
      tabledata.value[popoverkey.value[1]].phone = value[1];
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

//状态
const state = ref('all');
function _state() {
  switch(state.value) {
    case 'all' : {
      tabledata.value.forEach(item => {
        item.show=true;
      });
    }break;
    case 'normal' : {
      tabledata.value.forEach(item => {
        if(item.state=='正常') {
          item.show=true;
        }else{
          item.show=false;
        }
      });
    }break;
    case 'deleted' : {
      tabledata.value.forEach(item => {
        if(item.state=='黑名单') {
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
  <div class="kindlistbody">
    <!-- 菜单 -->
    <div class="backblack" v-if="store.state.backstage_popovershow">
      <PopoverPanel class="popover" :inputs="popover" :posturl="popoverposturl" :key="popoverkey[0]" @confirm="emitconfirm"></PopoverPanel>
    </div>

    <!-- 顶栏 -->
    <div class="banner">
      <form class="search" @submit.prevent="_search(searchtext)">
        <div class="text">用户昵称</div>
        <input class="searchbox" type="text" v-model="searchtext">
        <div class="searchbutton button" @click="_search(searchtext)">查询</div>
        <input type="submit" style="width: 0; height: 0;border: none;">
      </form>
      <div class="text">商品状态</div>
      <select class="select" name="" id="" v-model="state" @change="_state()">
        <option value="all" selected>全部</option>
        <option value="normal">正常</option>
        <option value="deleted">黑名单</option>
      </select>
      <div class="command"></div>
    </div>
    <!-- 主体 -->
    <div class="bodymain">
      <table class="maintable">
        <thead>
        <tr>
          <th class="id">ID</th>
          <th class="name">昵称</th>
          <th class="state">状态</th>
          <th class="deal">订单量</th>
          <th class="count">积分</th>
          <th class="phone">联系方式</th>
          <th class="address">常用地址</th>
          <th class="time">注册时间</th>
          <th class="command">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tabledata" v-show="item.show">
          <td>{{ item.id }}</td>
          <td>{{item.name}}</td>
          <td>{{item.state}}</td>
          <td>{{ item.deal }}</td>
          <td>{{item.count}}</td>
          <td>{{item.phone}}</td>
          <td>{{ item.address }}</td>
          <td>{{item.time[0]}}-{{item.time[1]}}-{{item.time[2]}}</td>
          <td class="command">
            <div>
              <div class="commandbutton change button" @click="_changekind(index)">修改信息</div>
              <div class="commandbutton delete button" @click="_deletekind(index)" v-show="item.state=='正常'">加入黑名单</div>
              <div class="commandbutton delete button" @click="_resale(index)" v-show="item.state=='黑名单'">移除黑名单</div>
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
  width: 60px;
}
.bodymain>.maintable .name {
  width: 130px;
}
.bodymain>.maintable .state {
  width: 90px;
}
.bodymain>.maintable .deal {
  width: 130px;
}
.bodymain>.maintable .count {
  width: 150px;
}
.bodymain>.maintable .phone {
  width: 160px;
}
.bodymain>.maintable .time {
  width: 160px;
}
.bodymain>.maintable .command {
  width: 280px;
}
@media only screen and (max-width: 1680px) {
  .bodymain>.maintable tr>td {
    height: 120rem;
  }
  .bodymain>.maintable .id {
    width: 60rem;
  }
  .bodymain>.maintable .name {
    width: 130rem;
  }
  .bodymain>.maintable .state {
    width: 90rem;
  }
  .bodymain>.maintable .deal {
    width: 130rem;
  }
  .bodymain>.maintable .count {
    width: 150rem;
  }
  .bodymain>.maintable .phone {
    width: 160rem;
  }
  .bodymain>.maintable .time {
    width: 160rem;
  }
  .bodymain>.maintable .command {
    width: 280rem;
  }
}
</style>