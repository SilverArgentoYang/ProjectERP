<script setup>
  //VUE引用
  import {ref, onMounted, inject, provide} from 'vue'

  // components
  import MainPage from "./components/MainPage.vue";

  // 自定义声明
  import Resource from './Resource';
  import Store from './Store';
  // 向下传值
  provide('resource',Resource);
  provide('store',Store);

</script>

<template>
  <RouterView></RouterView>
</template>