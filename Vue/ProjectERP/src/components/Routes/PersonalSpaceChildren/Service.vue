<script setup>
import axios from 'axios';
import { inject,ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// 状态管理
const store = inject('store');
function _spc_leftbarselected(selected) {
  store._spc_leftbarselected(selected);
}
//刷新时保持左侧菜单栏选项
_spc_leftbarselected(6);
//图标
const {
  Add,
  SelectImg
} = inject('resource');

//数据
const messagedata = ref([]);
// const messagedata = ref([{
//   id:'',
//   speaker:'',
//   message:''
// }]);
const userdata = ref({
  name:'',
  img:''
});
const serverdata = ref({
  name:'',
  img:''
});

function initmessage() {
  axios({
    url:'/getMessageInit',
    method:'get',
    params:{
      userid:''
    }
  }).then(res => {
    res.data.message.forEach(item => {
      messagedata.value.push({
        id:item.id,
        speaker:item.speaker,
        message:item.message,
      })
    });
    scrolling();
  });
}
initmessage();

function inituser() {
  axios({
    url:'/getUserMain',
    method:'get',
    params:{
      userid:''
    }
  }).then(res => {
    userdata.value.name = res.data.user.user_name;
    userdata.value.img = res.data.user.avator;
  })
}
inituser();

function initserver() {
  axios({
    url:'/getShopSetting',
    method:'get',
    params:{}
  }).then(res => {
    serverdata.value.name = res.data.settingdata.servicename;
    serverdata.value.img = res.data.settingdata.serviceavator;
  })
}
initserver();

//发送消息
const inputmsg = ref('');
function sendmessage(msg) {
  if(msg!=''){
    var newmsg = {
      id:Number(messagedata.value[messagedata.value.length-1].id)+1,
      speaker:'buyer',
      message:msg,
    }
    messagedata.value.push(newmsg);
    inputmsg.value = '';
    scrolling();
  }
}

//接受消息
function getmessage(id,msg) {
  messagedata.value.push({
    id:id,
    speaker:'service',
    message:msg,
  });
  scrolling();
}

//滚动画面
function scrolling(){
  setTimeout(()=>{
    var b= document.getElementById('messageshow');
    b.scrollTop = b.scrollHeight;
  },100);
}
</script>

<template>
<div class="servicebody">
  <input type="file" name="FileUpload" id="FileUpload" hidden>
  <div class="title">联系客服</div>
  <div class="cutline"></div>
<!--  <div class="additem button">-->
<!--    <div class="iconbox">-->
<!--      <Icons class="icon"><Add /></Icons>-->
<!--    </div>-->
<!--    <div class="text">添加您想要咨询的商品</div>-->
<!--  </div>-->
<!--  <div class="cutline"></div>-->

  <div class="mainbox">
    <div id="messageshow" class="messageshow">
      <div :class="{'servicemessage':item.speaker?item.speaker=='service':false,'buyermessage':item.speaker?item.speaker=='buyer':false}" v-for="item in messagedata">
        <img class="avator" :src="userdata.img" alt="" v-if="item.speaker=='buyer'">
        <img class="avator" :src="serverdata.img" alt="" v-if="item.speaker=='service'">
        <div class="messagemian">
          <div class="speakername" v-if="item.speaker=='buyer'">{{userdata.name}}</div>
          <div class="speakername" v-if="item.speaker=='service'">{{serverdata.name}}</div>
          <div class="messagebox">{{item.message}}</div>
        </div>
      </div>
    </div>
    <div class="cutline"></div>
    <div class="inputbox">
      <div class="functions">
        <Icons class="icon button"><SelectImg /></Icons>
      </div>
      <textarea class="input" v-model="inputmsg"></textarea>
      <div class="send">
        <div class="button thisbutton" @click="sendmessage(inputmsg)">发送</div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
@import url(../../../css/Service.css);
</style>