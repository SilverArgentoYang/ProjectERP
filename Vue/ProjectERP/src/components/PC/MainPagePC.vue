<script setup>
    // components
    import NavigatorPC from './NavigatorPC.vue';

</script>
<template>
    <NavigatorPC></NavigatorPC>
    <div class="blank"></div>
    <RouterView></RouterView>
</template>
<style scoped>
    .blank {
        height: 200px;
    }
</style>