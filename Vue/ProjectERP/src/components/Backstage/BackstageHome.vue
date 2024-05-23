<script setup>
import { inject } from 'vue';

    
    //inject
    const store = inject('store');

    //侧边栏
    store._backstage_sidebar(0,0);
</script>

<template>
    <div class="homebody"></div>
</template>
    
<style scoped>
    
</style>