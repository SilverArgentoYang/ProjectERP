<script setup>
    import Navigator from './Navigator.vue';
</script>

<template>
    <div class="top">
        <div class="logo">
            <img class="img" src="" alt="">
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