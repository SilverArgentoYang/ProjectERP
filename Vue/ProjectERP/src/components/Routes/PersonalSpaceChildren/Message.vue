<script setup>
    import { inject,ref } from 'vue';
    // 状态管理
    const store = inject('store');
    function _spc_leftbarselected(selected) {
        store._spc_leftbarselected(selected);
    }
    //刷新时保持左侧菜单栏选项
    _spc_leftbarselected(3);
    //标签选择
    const subtitleselected = ref(0);
    function _subtitleselect(select) {
        subtitleselected.value = select;
    }
</script>

<template>
    <div class="messagebody">
        <div class="title">我的消息</div>
        <div class="tablehead">
            <div class="filter">
                <div :class="{'subtitle':true,'button':true,'selected':subtitleselected==0}"
                    @click="_subtitleselect(0)"
                >商家客服</div>
                <div :class="{'subtitle':true,'button':true,'selected':subtitleselected==1}"
                    @click="_subtitleselect(1)"
                >收到的赞</div>
                <div :class="{'subtitle':true,'button':true,'selected':subtitleselected==2}"
                    @click="_subtitleselect(2)"
                >回复我的</div>
                <div :class="{'subtitle':true,'button':true,'selected':subtitleselected==3}"
                    @click="_subtitleselect(3)"
                >私信消息</div>
                <div :class="{'subtitle':true,'button':true,'selected':subtitleselected==4}"
                    @click="_subtitleselect(4)"
                >系统消息</div>
            </div>
            <div class="underline"></div>
        </div>
    </div>
</template>
    
<style scoped>
    @import url(../../../css/Message.css);
</style>