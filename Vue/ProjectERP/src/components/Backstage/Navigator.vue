<script setup>
    
</script>

<template>
    <div class="navigatorbody">
        <div class="navigate">
            <div class="button navnode">
                <Icons class="icon"></Icons>
                主站
            </div>
        </div>
        <div class="searchbox">
            <input class="input" type="text">
            <Icons class="button icon"></Icons>
        </div>
        <div class="right">
            <div style="position: relative;"><div class="userpanel">
                <div class="button panelitem">修改密码</div>
                <div class="cutline"></div>
                <div class="button panelitem">退出登录</div>
            </div></div>
            <div class="button userinfo">
                <img class="img" src="" alt="">
                <div class="username">用户名</div>
                <Icons class="icon"></Icons>
            </div>
        </div>
    </div>
</template>
    
<style scoped>
    @import url(../../css/Backstage/Navigator.css);
</style>