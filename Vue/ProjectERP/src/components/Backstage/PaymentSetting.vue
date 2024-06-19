<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
//inject
const store = inject('store');

//侧边栏
store._backstage_sidebar(4,11);

//路径
store._addpath(1,'BPayment','支付设置');

//保存设置
function updatesetting() {

}
</script>

<template>
<div class="paymentbody">
  <div>
    <div class="banner">
      <div class="thisbutton button" @click="updatesetting()">保存设置</div>
    </div>
  </div>

  <div><div class="alipay">
    <div class="subtitle">支付宝支付设置：</div>
    <div class="checkoutbody">
      <div class="inputbox">
        <div class="text">key：</div>
        <textarea class="input" rows="6" ></textarea>
      </div>
      <div class="inputbox">
        <div class="text">token：</div>
        <textarea class="input"></textarea>
      </div>
    </div>
  </div></div>

  <div><div class="alipay">
    <div class="subtitle">微信支付设置：</div>
    <div class="checkoutbody">
      <div class="inputbox">
        <div class="text">key：</div>
        <textarea class="input" rows="6" ></textarea>
      </div>
      <div class="inputbox">
        <div class="text">token：</div>
        <textarea class="input"></textarea>
      </div>
    </div>
  </div></div>
</div>
</template>

<style scoped>
@import url(../../css/Backstage/PaymentSetting.css);
</style>