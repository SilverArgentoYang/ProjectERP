<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
//inject
const store = inject('store');

//侧边栏
store._backstage_sidebar(4,9);

//路径
store._addpath(1,'BShop','店铺设置');

</script>

<template>
  <div class="shopsettingbody">
    <div>
      <div class="banner">
        <div class="thisbutton button">保存设置</div>
      </div>
    </div>

    <div><div class="subtitle">店铺LOGO：</div></div>
    <div><div class="avatorbox">
      <img class="logo" src="" alt="">
      <div class="righttext">
        <div class="subtitle">店铺名称：</div>
        <div class="name">
          <div class="boldtext">店铺名称店铺名称</div>
          <Icons class="icon button"></Icons>
        </div>
        <div class="subtitle">主题颜色：</div>
        <div :class="{'colorselector':true,'colorselectoropen':false,'button':true}">
          <div><div class="colors" :style="{'background-color':red}"></div></div>
        </div>
      </div>
    </div></div>

    <div><div class="subtitle">店铺主图：</div></div>
    <div><img class="bannerimg" src="" alt=""></div>
    <div><div class="thisbutton button">修改主图</div></div>
    <div><div class="address">
      <div class="subtitle">发货地址：</div>
      <div class="boldtext">广东省深圳市南山区腾讯科技园11号</div>
      <Icons class="icon button"></Icons>
    </div></div>

    <div><div class="address">
      <div class="subtitle">退货地址：</div>
      <div class="boldtext">广东省深圳市南山区腾讯科技园11号</div>
      <Icons class="icon button"></Icons>
    </div></div>

    <div class="cutline"></div>

    <div><div class="subtitle">客服头像：</div></div>
    <div><div class="avatorbox">
      <img class="logo" src="" alt="">
      <div class="righttext">
        <div class="subtitle">客服昵称：</div>
        <div class="name">
          <div class="boldtext">客服昵称客服昵称</div>
          <Icons class="icon button"></Icons>
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
      <tr v-for="(item,index) in replyrules" v-show="item.show">
        <td>{{item.name}}</td>
        <td :class="{'editing':false}">{{item.text}}</td>
        <td>{{ item.state }}</td>
        <td class="command">
          <div>
            <div class="thisbutton button" @click="_stoprule(index)">停用规则</div>
            <div class="thisbutton button" @click="_changerule(index)">修改规则</div>
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