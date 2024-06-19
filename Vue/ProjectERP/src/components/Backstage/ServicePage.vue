<script setup>
import axios from "axios";
import {inject, ref, shallowRef} from "vue";
import PopoverPanel from "./PopoverPanel.vue";
//inject
const store = inject('store');
const {
  up_arrow,
  down_arrow,
  SelectImg
} = inject('resource');

//侧边栏
store._backstage_sidebar(7,16);

//路径
store._addpath(1,'BService','客服消息');

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
const allmessages = ref([]);
// const allmessages = ref([{
//   id:'',
//   name:'',
//   avator:''
// }])

function _getallmessages() {
  axios({
    url:'/getAllMessages',
    method:'get',
    params:{}
  }).then(res => {
    res.data.messages.forEach(item => {
      allmessages.value.push({
        id:item.id,
        name:item.name,
        avator:item.avator
      })
    })
  })
}
_getallmessages();

function initmessage(userid) {
  axios({
    url:'/getMessageInit',
    method:'get',
    params:{
      userid:userid
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

function inituser(userid) {
  axios({
    url:'/getUserMain',
    method:'get',
    params:{
      userid:userid
    }
  }).then(res => {
    userdata.value.name = res.data.user.user_name;
    userdata.value.img = res.data.user.avator;
  })
}

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
      speaker:'service',
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
    speaker:'buyer',
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

//聊天框显示
const opening = ref(-1);
const arrow = shallowRef(down_arrow);
const ismessageboxshow = ref(false);
function _messagestart(userid,index) {
  if(!ismessageboxshow.value){
    ismessageboxshow.value = true;
    initmessage(userid);
    inituser(userid);
    arrow.value = up_arrow;
    opening.value = index;
  }else{
    ismessageboxshow.value = false;
    arrow.value = down_arrow;
    opening.value = -1;
  }
}
</script>

<template>
<div class="servicebody">
  <div class="messageitems button" v-for="(item,index) in allmessages" v-show="opening==index||opening==-1" @click="_messagestart(item.id,index)">
    <img class="avator" :src="item.avator" alt="">
    <div class="name">{{item.name}}</div>
    <Icons class="arrowicon"><arrow /></Icons>
  </div>

  <div class="mainmain" v-show="opening!=-1">
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
</div>
</template>

<style scoped>
@import url(../../css/Backstage/ServicePage.css);
</style>