<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
    const router = useRouter();
    //store
    const store = inject('store');
    //跳转到首页
    function _jumptohomepage() {
        router.push({
            name:'Home'
        })
    }
    //测试登录
    function _testlog() {
        localStorage.setItem('user','001');
        store.user_islogin(true);
        _jumptohomepage();
    }
    _testlog();
</script>

<template>
    
</template>
    
<style scoped>
    
</style>