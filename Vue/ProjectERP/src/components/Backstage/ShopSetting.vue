<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
//inject
const store = inject('store');
const {
  Edit,
  Aply
} = inject('resource');

//侧边栏
store._backstage_sidebar(4,9);

//路径
store._addpath(1,'BShop','店铺设置');

//拉取数据
const settingdata = ref({
  logo:'',
  name:'',
  color:'#d90000',
  mainimg:'',
  postaddress:'',
  returnaddress:'',
  serviceavator:'',
  servicename:'',
});
const replyrules = ref([]);
const colors = ref([
  {id:0,color:'#d90000'},
  {id:1,color:'#6ae3c2'},
  {id:2,color:'#0d1f7d'},
  {id:3,color:'#382e6e'},
  {id:4,color:'#ff5600'},
])

function _getshopsetting() {
  axios({
    url:'/getShopSetting',
    method:'get',
    params:{}
  }).then(res=>{
    settingdata.value.logo = res.data.settingdata.logo;
    settingdata.value.name = res.data.settingdata.name;
    settingdata.value.color = res.data.settingdata.color;
    settingdata.value.mainimg = res.data.settingdata.mainimg;
    settingdata.value.postaddress = res.data.settingdata.postaddress;
    settingdata.value.returnaddress = res.data.settingdata.returnaddress;
    settingdata.value.serviceavator = res.data.settingdata.serviceavator;
    settingdata.value.servicename = res.data.settingdata.servicename;
    res.data.settingdata.replyrules.forEach(item=>{
      replyrules.value.push({
        id: item.id,
        name: item.name,
        text: item.text,
        state: item.state,
        editing: false
      });
    });
  });
}
_getshopsetting();

//保存设置
function updatesetting() {
  axios({
    url:'/postShopSetting',
    method:'post',
    params:{
      settingdata:settingdata.value,
      replyrules:replyrules.value.slice()
    }
  }).then(res=>{
    if(res.data.success == 'true') {
    }
  })
}

//停用规则
function _stoprule(index) {
  axios({
    url:'/postRulesStop',
    method:'post',
    params:{
      id:replyrules.value[index].id
    }
  }).then(res=>{
    if(res.data.success == 'true') {
      replyrules.value[index].state = '停用中';
    }
  })
}

//启用规则
function _userule(index) {
  axios({
    url:'/postRulesUse',
    method:'post',
    params:{
      id:replyrules.value[index].id
    }
  }).then(res=>{
    if(res.data.success == 'true') {
      replyrules.value[index].state = '启用中';
    }
  })
}

//修改规则
function _changerule(index) {
  replyrules.value[index].editing = true;
}

//修改规则完成
function _changeruledone(index) {
  replyrules.value[index].editing = false;
}

//修改店铺LOGO
function _changelogo() {
  var Uploader = document.getElementById('FileUploadlogo');
  Uploader.click();
  Uploader.addEventListener('change',function() {
    var fileObj = Uploader.files[0];
    if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
      alert("请选择图片");
      return;
    }
    axios({
      url:'/postUploadImg',
      method:'post',
      params:{
        img:fileObj,
        oldimg:settingdata.value.logo
      }
    }).then(res=>{
      console.log(res.data.newimgurl);
      settingdata.value.logo = res.data.newimgurl;
    })
  })
}

//修改店铺名称
const nameediting = ref(false);
function _changeshopname() {
  if(nameediting.value) {
    nameediting.value = false;
  }else{
    nameediting.value = true;
  }
}

//修改主题颜色
const colorlistopen = ref(false);
function _colorlistopen() {
  if(colorlistopen.value) {
    colorlistopen.value = false;
  }else{
    colorlistopen.value = true;
  }
}
function _colorselect(index) {
  settingdata.value.color = colors.value[index].color;
  var temp = colors.value[index];
  for (var i = index; i > 0; i--) {
    colors.value[i] = colors.value[i-1];
  }
  colors.value[0] = temp;
}

//修改店铺主图
function _changemainimg() {
  var Uploader = document.getElementById('FileUploadmainimg');
  Uploader.click();
  Uploader.addEventListener('change',function() {
    var fileObj = Uploader.files[0];
    if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
      alert("请选择图片");
      return;
    }
    axios({
      url:'/postUploadImg',
      method:'post',
      params:{
        img:fileObj,
        oldimg:settingdata.value.mainimg
      }
    }).then(res=>{
      console.log(res.data.newimgurl);
      settingdata.value.mainimg = res.data.newimgurl;
    })
  })
}

//修改发货地址
const postaddressediting = ref(false);
function _changepostaddress() {
  if(postaddressediting.value) {
    postaddressediting.value = false;
  }else{
    postaddressediting.value = true;
  }
}

//修改退货地址
const returnaddress = ref(false);
function _changereturnaddress() {
  if(returnaddress.value) {
    returnaddress.value = false;
  }else{
    returnaddress.value = true;
  }
}

//修改客服头像
function _changeserviceavator() {
  var Uploader = document.getElementById('FileUploadserviceavator');
  Uploader.click();
  Uploader.addEventListener('change',function() {
    var fileObj = Uploader.files[0];
    if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
      alert("请选择图片");
      return;
    }
    axios({
      url:'/postUploadImg',
      method:'post',
      params:{
        img:fileObj,
        oldimg:settingdata.value.serviceavator
      }
    }).then(res=>{
      console.log(res.data.newimgurl);
      settingdata.value.serviceavator = res.data.newimgurl;
    })
  })
}

//修改客服昵称
const servicename = ref(false);
function _changeservicename() {
  if(servicename.value) {
    servicename.value = false;
  }else{
    servicename.value = true;
  }
}
</script>

<template>
  <div class="shopsettingbody">
    <div>
      <div class="banner">
        <div class="thisbutton button" @click="updatesetting()">保存设置</div>
      </div>
    </div>

    <input type="file" name="FileUploadlogo" id="FileUploadlogo" hidden>
    <input type="file" name="FileUploadmainimg" id="FileUploadmainimg" hidden>
    <input type="file" name="FileUploadserviceavator" id="FileUploadserviceavator" hidden>

    <div><div class="subtitle">店铺LOGO：</div></div>
    <div><div class="avatorbox">
      <img class="logo button" :src="settingdata.logo" alt="" @click="_changelogo()">
      <div class="righttext">
        <div class="subtitle">店铺名称：</div>
        <div class="name">
          <div class="boldtext" v-show="!nameediting">{{ settingdata.name }}</div>
          <input class="boldtext editbox" v-model="settingdata.name" v-show="nameediting" />
          <Icons class="icon button" @click="_changeshopname()"><Edit v-show="!nameediting"/><Aply v-show="nameediting"/></Icons>
        </div>
        <div class="subtitle">主题颜色：</div>
        <div :class="{'colorselector':true,'colorselectoropen':colorlistopen,'button':true}" @click="_colorlistopen()">
          <div v-for="(item,index) in colors" @click="_colorselect(index)"><div class="colors" :style="{'background-color':item.color}"></div></div>
        </div>
      </div>
    </div></div>

    <div><div class="subtitle">店铺主图：</div></div>
    <div><img class="bannerimg" :src="settingdata.mainimg" alt=""></div>
    <div><div class="thisbutton button" @click="_changemainimg()">修改主图</div></div>
    <div><div class="address">
      <div class="subtitle">发货地址：</div>
      <div class="boldtext" v-show="!postaddressediting">{{ settingdata.postaddress }}</div>
      <input class="boldtext editbox" v-model="settingdata.postaddress" v-show="postaddressediting" />
      <Icons class="icon button" @click="_changepostaddress()"><Edit v-show="!postaddressediting"/><Aply v-show="postaddressediting"/></Icons>
    </div></div>

    <div><div class="address">
      <div class="subtitle">退货地址：</div>
      <div class="boldtext" v-show="!returnaddress">{{ settingdata.returnaddress }}</div>
      <input class="boldtext editbox" v-model="settingdata.returnaddress" v-show="returnaddress" />
      <Icons class="icon button" @click="_changereturnaddress()"><Edit v-show="!returnaddress"/><Aply v-show="returnaddress"/></Icons>
    </div></div>

    <div class="cutline"></div>

    <div><div class="subtitle">客服头像：</div></div>
    <div><div class="avatorbox">
      <img class="logo button" :src="settingdata.serviceavator" alt="" @click="_changeserviceavator()">
      <div class="righttext">
        <div class="subtitle">客服昵称：</div>
        <div class="name">
          <div class="boldtext" v-show="!servicename">{{ settingdata.servicename }}</div>
          <input class="boldtext editbox" v-model="settingdata.servicename" v-show="servicename" />
          <Icons class="icon button" @click="_changeservicename()"><Edit v-show="!servicename"/><Aply v-show="servicename"/></Icons>
        </div>
      </div>
    </div></div>

    <div><div class="subtitle">自动回复设置：</div></div>
    <div><table class="replytable">
      <thead>
      <tr>
        <th class="name">规则</th>
        <th class="text">回复内容</th>
        <th class="state">状态</th>
        <th class="command">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in replyrules">
        <td>{{item.name}}</td>
        <td>
          <span v-show="!item.editing">{{item.text}}</span>
          <input v-show="item.editing" v-model="item.text" style="width:80%;height:80%;text-align:center;" />
        </td>
        <td>{{ item.state }}</td>
        <td class="command">
          <div>
            <div class="thisbutton button" @click="_stoprule(index)" v-show="item.state == '启用中'">停用规则</div>
            <div class="thisbutton button" @click="_userule(index)" v-show="item.state == '停用中'">启用规则</div>
            <div class="thisbutton button" @click="_changerule(index)" v-show="!item.editing">修改规则</div>
            <div class="thisbutton button" @click="_changeruledone(index)" v-show="item.editing">修改完成</div>
          </div>
        </td>
      </tr>
      </tbody>
    </table></div>
  </div>
</template>

<style scoped>
@import url(../../css/Backstage/ShopSetting.css);
.replytable tr>td {
  height: 50px;
}
.replytable .name {
  width: 300px;
}
.replytable .state {
  width: 200px;
}
.replytable .command {
  width: 260px;
}
@media only screen and (max-width: 1680px) {
  .replytable tr>td {
    height: 50rem;
  }
  .replytable .name {
    width: 300rem;
  }
  .replytable .state {
    width: 200rem;
  }
  .replytable .command {
    width: 260rem;
  }
}
</style>