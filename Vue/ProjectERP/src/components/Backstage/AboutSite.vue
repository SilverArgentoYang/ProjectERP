<script setup>
import axios from "axios";
import { inject, ref } from "vue";
import PopoverPanel from "./PopoverPanel.vue";
//inject
const store = inject('store');

//侧边栏
store._backstage_sidebar(7,17);

//路径
store._addpath(1,'BAbout','关于本站');

//复制
function _copy(text) {
  navigator.clipboard.writeText(text).then(
      function() {
        store._showmessage('联系方式复制成功');
      }
  )
}
</script>

<template>
<div class="aboutbody">
  <p>本站开发由 <span>@银白</span> 提供</p>
  <p>本站最终解释权由 <span>@银白</span> 所有</p>
  <p>如有需求请联系开发者：</p>
  <p>邮箱：<span class="button" @click="_copy('kevin_yangdianzhe@qq.com')">kevin_yangdianzhe@qq.com</span></p>
  <p>QQ：<span class="button" @click="_copy('863202739')">863202739</span></p>
  <p>电话：<span class="button" @click="_copy('13067615606')">13067615606</span></p>
  <p>微信同号</p>
</div>
</template>

<style scoped>
.aboutbody {
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.aboutbody span {
  color: var(--colorred);
}
</style>