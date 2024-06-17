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
    <div class="messageshow"></div>
    <div class="cutline"></div>
    <div class="inputbox">
      <div class="functions">
        <Icons class="icon button"><SelectImg /></Icons>
      </div>
      <textarea class="input"></textarea>
      <div class="send">
        <div class="button thisbutton">发送</div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
@import url(../../../css/Service.css);
</style>