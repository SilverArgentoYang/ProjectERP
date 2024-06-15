<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
//inject
const store = inject('store');

//侧边栏
store._backstage_sidebar(7,15);

//路径
store._addpath(1,'BComment','评论列表');

//请求数据
const tabledata = ref([{
  id:'',
  uname:'',
  text:'',
  time:['','',''],
  show:true
}]);

function _getdata() {
  axios({
    url:'/getGoodComments',
    method:'get',
    params:{}
  }).then(res=>{
    tabledata.value.length=0;
    res.data.comments.forEach(item => {
      tabledata.value.push({
        id:item.commentid,
        uname:item.user.username,
        text:item.text,
        time:[item.time[0],item.time[1],item.time[2]],
        show:true
      });
      if(item.childcomments) {
        item.childcomments.forEach(itemj=>{
          tabledata.value.push({
            id:itemj.commentid,
            uname:itemj.user.username,
            text:itemj.text,
            time:[itemj.time[0],itemj.time[1],itemj.time[2]],
            show:true
          });
        });
      }

    });
  });
}
_getdata();

//查询
const searchtext = ref('');
function _search(text) {
  tabledata.value.forEach(item => {
    if(item.text.includes(text)) {
      item.show=true;
    }else{
      item.show=false;
    }
  });
}

//删除评论
function _deletecomment(index) {
  var r = confirm('是否确认删除评论');
  if(r) {
    axios({
      url: '/postCommentDelete',
      method: 'post',
      params: {
        id: tabledata.value[index].id
      }
    }).then(res => {
      if (res.data.success == 'true') {
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
</script>

<template>
<div class="commentsbody">
  <!-- 顶栏 -->
  <div class="banner">
    <form class="search" @submit.prevent="_search(searchtext)">
      <div class="text">评论内容</div>
      <input class="searchbox" type="text" v-model="searchtext">
      <div class="searchbutton button" @click="_search(searchtext)">查询</div>
      <input type="submit" style="width: 0; height: 0;border: none;">
    </form>
  </div>
  <!-- 主体 -->
  <div class="bodymain">
    <table class="maintable">
      <thead>
      <tr>
        <th class="id">ID</th>
        <th class="uname">用户名</th>
        <th class="text">评论内容</th>
        <th class="time">评论时间</th>
        <th class="command">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in tabledata" v-show="item.show">
        <td>{{ item.id }}</td>
        <td>{{item.uname}}</td>
        <td>{{ item.text }}</td>
        <td>{{item.time[0]}}-{{item.time[1]}}-{{item.time[2]}}</td>
        <td class="command">
          <div>
            <div class="commandbutton delete button" @click="_deletecomment(index)">删除评论</div>
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
  height: 130px;
}
.bodymain>.maintable .id {
  width: 60px;
}
.bodymain>.maintable .uname {
  width: 190px;
}
.bodymain>.maintable .time {
  width: 150px;
}
.bodymain>.maintable .command {
  width: 200px;
}
@media only screen and (max-width: 1680px) {
  .bodymain>.maintable tr>td {
    height: 130rem;
  }
  .bodymain>.maintable .id {
    width: 60rem;
  }
  .bodymain>.maintable .uname {
    width: 190rem;
  }
  .bodymain>.maintable .time {
    width: 150rem;
  }
  .bodymain>.maintable .command {
    width: 200rem;
  }
}
</style>