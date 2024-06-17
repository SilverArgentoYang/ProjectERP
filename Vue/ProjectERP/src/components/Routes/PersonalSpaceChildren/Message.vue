<script setup>
    import { inject,ref } from 'vue';
    import axios from "axios";
    import { useRouter } from 'vue-router';
    const router = useRouter();
    // 状态管理
    const store = inject('store');
    function _spc_leftbarselected(selected) {
        store._spc_leftbarselected(selected);
    }
    //刷新时保持左侧菜单栏选项
    _spc_leftbarselected(3);
    //标签选择
    const subtitleselected = ref(0);
    function _subtitleselect(select) {
        subtitleselected.value = select;
    }

    //数据
    const tabledata = ref([]);
    // const tabledata = ref([{
    //   id:'001',
    //   img:'',
    //   name:'张三',
    //   text:'评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容'
    // }]);
    function _getmessages(type) {
      tabledata.value.length = 0;
      axios({
        url:'/getUserMessage',
        method:'get',
        params:{
          userid:'',
          type:type
        }
      }).then(res=>{
        res.data.message.forEach(item => {
          tabledata.value.push({
            id:item.id,
            img:item.img,
            name:item.name,
            text:item.text,
          })
        })
      });
    }
    _getmessages('like');

    //点击跳转页面
    function gotomessage(id) {
      if(subtitleselected.value==0||subtitleselected.value==1){
        router.push({
          name:'Detial',
          params:{
            goodid:id
          }
        });
      }
    }
</script>

<template>
    <div class="messagebody">
        <div class="title">我的消息</div>
        <div class="tablehead">
            <div class="filter">
                <div :class="{'subtitle':true,'button':true,'selected':subtitleselected==0}"
                    @click="_subtitleselect(0);_getmessages('like')"
                >收到的赞</div>
                <div :class="{'subtitle':true,'button':true,'selected':subtitleselected==1}"
                    @click="_subtitleselect(1);_getmessages('reply')"
                >回复我的</div>
                <div :class="{'subtitle':true,'button':true,'selected':subtitleselected==2}"
                    @click="_subtitleselect(2);_getmessages('system')"
                >系统消息</div>
            </div>
            <div class="underline"></div>
        </div>
      <div class="tablemain">
        <div class="tableitem" v-for="item in tabledata">
          <div class="mainitem button" @click="gotomessage(item.id)">
            <img class="itemimg" :src="item.img" alt="" v-show="subtitleselected==0||subtitleselected==1">
            <div class="itemname" v-show="subtitleselected==0||subtitleselected==1">{{item.name}}</div>
            <div class="itemname" v-show="subtitleselected==0">点赞了您的评论</div>
            <div class="itemtext">{{item.text}}</div>
          </div>
          <div class="cutline"></div>
        </div>
      </div>
    </div>
</template>
    
<style scoped>
    @import url(../../../css/Message.css);
</style>