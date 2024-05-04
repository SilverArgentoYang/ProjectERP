<script setup>
    // components
    import Navigator from './Navigator.vue';
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