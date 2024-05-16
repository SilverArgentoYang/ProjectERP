<script setup>
    import { inject } from 'vue';
import Navigator from './Navigator.vue';
import { useRouter } from 'vue-router';
    const router = useRouter();
    //inject
    const store = inject('store');
    const {
        nav_logo
    } = inject('resource');
    //自动登录
    function _autologin() {
        if(localStorage.getItem('user')&&localStorage.getItem('user')!='null') {
            store.user_islogin(true);
        }else{
            router.push({
                    name:'Home'
            });
        }
    }
    _autologin();
</script>

<template>
    <div class="top">
        <div class="logo">
            <img class="img" :src="nav_logo" alt="">
        </div>
        <Navigator class="navigator"></Navigator>
    </div>
</template>
    
<style scoped>
    .top {
        display: flex;
        height: 50px;
    }
    .logo {
        width: 220px;
        height: 100%;
        background-color: var(--colororange);
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .logo>.img {
        width: 200px;
        height: 40px;
        object-fit:contain;
    }
    .navigator {
        flex: 1;
    }
</style>