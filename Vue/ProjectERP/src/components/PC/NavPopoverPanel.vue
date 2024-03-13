<script setup>
import { inject } from 'vue';
    // components
    import PanelItem from './PanelItem.vue'

    //状态管理
    const store = inject('store');
    const {
        cartgoods,
        favoritegoods,
        historygoods
    } = inject('resource');

</script>

<template>
    <div class="popoverpanelbody">
        <!-- 后端重构后需要调整 -->
        <div v-if="store.state.nav_popoverpaneltarget == 'cart'">
            <PanelItem v-for="item in cartgoods" :item="item"></PanelItem>
        </div>
        <div v-if="store.state.nav_popoverpaneltarget == 'favorites'">
            <PanelItem v-for="item in favoritegoods" :item="item"></PanelItem>
        </div>
        <div v-if="store.state.nav_popoverpaneltarget == 'history'">
            <PanelItem v-for="item in historygoods" :item="item"></PanelItem>
        </div>
    </div>
</template>

<style scoped>
    .popoverpanelbody {
        background-color: var(--colorwhite);
        border-radius: 15px;
        box-shadow: 0 1px 1px var(--shadowblack);
        width: 300px;
        height: 370px;
        overflow-y: scroll;
        padding: 9px 15px;        
        box-sizing: border-box;
    }
    .popoverpanelbody::-webkit-scrollbar {
    display: none;
    }
</style>