<script setup>
import { inject } from 'vue';
    // components
    import Navigator from './Navigator.vue';
    //injuct
    const store = inject('store');
    //自动登录
    function _autologin() {
        if(localStorage.getItem('user')&&localStorage.getItem('user')!='null') {
            store.user_islogin(true);
        }
    }
    _autologin();
</script>
<template>
    <Navigator></Navigator>
    <div class="blank"></div>
    <RouterView></RouterView>
</template>
<style scoped>
    .blank {
        height: 200px;
    }
</style>