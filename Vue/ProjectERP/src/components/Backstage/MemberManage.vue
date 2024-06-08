<script setup>
import axios from "axios";
import {inject, ref} from "vue";
import PopoverPanel from "./PopoverPanel.vue";
//inject
const store = inject('store');

//侧边栏
store._backstage_sidebar(3, 7);

//路径
store._addpath(1, 'BKind', '分类列表');

//浮动菜单内容
const popover = ref([
  {
    type:'text',
    text:'姓名',
    defualtvalue:''
  },
  {
    type:'department',
    text:'部门',
    defualtvalue:''
  },
  {
    type:'text',
    text:'联系方式',
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
  id: '',
  name: '',
  department: {
    id : '',
    name : ''
  },
  check: '',
  late: '',
  early: '',
  uncheck: '',
  phone: '',
  note: '',
  time: ['', '', ''],
  show: true
}]);

function _getdata() {
  axios({
    url: '/getMember',
    method: 'get',
    params: {}
  }).then(res => {
    tabledata.value.length = 0;
    res.data.member.forEach(item => {
      tabledata.value.push({
        id: item.id,
        name: item.name,
        department: {
          id : item.department.id,
          name : item.department.name
        },
        check: item.check,
        late: item.late,
        early: item.early,
        uncheck: item.uncheck,
        phone: item.phone,
        note: item.note,
        time: [item.time[0], item.time[1], item.time[2]],
        show: true
      })
    });
  });
}
_getdata();

//创建分类
const popoverkey = ref(['null',0]);
const popoverposturl = ref('');
function _createkind() {
  popoverposturl.value = '/postMemberCreate';
  popoverkey.value[0] = 'create'
  popover.value[0].defualtvalue = '';
  popover.value[1].defualtvalue = '';
  popover.value[2].defualtvalue = '';
  popover.value[3].defualtvalue = '';
  store._backstage_popovershow(true);
}

//修改分类
function _changekind(index) {
  var item = tabledata.value[index];
  popoverposturl.value = '/postMemberChange';
  popoverkey.value[0] = 'change';
  popoverkey.value[1] = index;
  popover.value[0].defualtvalue = item.name;
  popover.value[1].defualtvalue = item.department.id;
  popover.value[2].defualtvalue = item.phone;
  popover.value[3].defualtvalue = item.note;
  store._backstage_popovershow(true);
}

//弃用分类
function _deletekind(index) {
  var r = confirm('是否确认删除');
  if(r) {
    axios({
      url:'/postMemberDelete',
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

//拉取部门
const department = ref([]);
function _getdepartment() {
  axios({
    url:'/getDepartment',
    method:'get',
    params:{}
  }).then(res=>{
    res.data.department.forEach(item => {
      department.value.push({
        id:item.id,
        name:item.name
      });
    });
  })
}
_getdepartment();

//菜单提交
function emitconfirm(value) {
  if(value[0].replace(/\s*/g,"")!="") {
    var departmentname = ref();
    department.value.forEach(item => {
      if(item.id==value[1]){
        departmentname = item.name;
      }
    })
    if(popoverkey.value[0]=='create'){
      tabledata.value.push({
        count:'0',
        id:tabledata.value.length>0?Number(tabledata.value[tabledata.value.length-1].id)+1:0,
        name:value[0],
        department: {
          id : value[1],
          name : departmentname
        },
        check: '',
        late: '',
        early: '',
        uncheck: '',
        phone: value[2],
        note:value[3],
        time:[new Date().getFullYear(),('0' + (new Date().getMonth() + 1)).slice(-2),('0' + new Date().getDate()).slice(-2)],
        show: true
      });
    }
    if(popoverkey.value[0]=='change'){
      tabledata.value[popoverkey.value[1]].name = value[0];
      tabledata.value[popoverkey.value[1]].department = {
        id : value[1],
        name : departmentname
      };
      tabledata.value[popoverkey.value[1]].phone = value[2];
      tabledata.value[popoverkey.value[1]].note = value[3];
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
      <PopoverPanel class="popover" :inputs="popover" :posturl="popoverposturl" :key="popoverkey[0]"
                    @confirm="emitconfirm"></PopoverPanel>
    </div>

    <!-- 顶栏 -->
    <div class="banner">
      <form class="search" @submit.prevent="_search(searchtext)">
        <div class="text">员工姓名</div>
        <input class="searchbox" type="text" v-model="searchtext">
        <div class="searchbutton button" @click="_search(searchtext)">查询</div>
        <input type="submit" style="width: 0; height: 0;border: none;">
      </form>
      <div class="command">
        <div class="commandbutton createkind button" @click="_createkind()">注册员工</div>
      </div>
    </div>
    <!-- 主体 -->
    <div class="bodymain">
      <table class="maintable">
        <thead>
        <tr>
          <th class="id">ID</th>
          <th class="name">姓名</th>
          <th class="department">部门</th>
          <th class="check">本月出勤</th>
          <th class="late">迟到</th>
          <th class="early">早退</th>
          <th class="uncheck">未打卡</th>
          <th class="phone">联系方式</th>
          <th class="note">备注</th>
          <th class="time">创建时间</th>
          <th class="command">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in tabledata" v-show="item.show">
          <td>{{ item.id }}</td>
          <td>{{item.name}}</td>
          <td>{{item.department.name}}</td>
          <td>{{ item.check }}</td>
          <td>{{ item.late }}</td>
          <td>{{item.early}}</td>
          <td>{{item.uncheck}}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.note }}</td>
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
  height: 120px;
}
.bodymain>.maintable .id {
  width: 60px;
}
.bodymain>.maintable .name {
  width: 90px;
}
.bodymain>.maintable .department {
  width: 200px;
}
.bodymain>.maintable .check {
  width: 100px;
}
.bodymain>.maintable .late {
  width: 70px;
}
.bodymain>.maintable .early {
  width: 70px;
}
.bodymain>.maintable .uncheck {
  width: 80px;
}
.bodymain>.maintable .phone {
  width: 150px;
}
.bodymain>.maintable .time {
  width: 150px;
}
.bodymain>.maintable .command {
  width: 220px;
}
@media only screen and (max-width: 1680px) {
  .bodymain>.maintable tr>td {
    height: 120rem;
  }
  .bodymain>.maintable .id {
    width: 60rem;
  }
  .bodymain>.maintable .name {
    width: 90rem;
  }
  .bodymain>.maintable .department {
    width: 200rem;
  }
  .bodymain>.maintable .check {
    width: 100rem;
  }
  .bodymain>.maintable .late {
    width: 70rem;
  }
  .bodymain>.maintable .early {
    width: 70rem;
  }
  .bodymain>.maintable .uncheck {
    width: 80rem;
  }
  .bodymain>.maintable .phone {
    width: 150rem;
  }
  .bodymain>.maintable .time {
    width: 150rem;
  }
  .bodymain>.maintable .command {
    width: 220rem;
  }
}
</style>