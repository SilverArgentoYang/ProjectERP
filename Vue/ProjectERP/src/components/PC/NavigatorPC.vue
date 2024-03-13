<script setup>
    //VUE引用
    import { inject, ref } from 'vue';

    // components
    import NavAvatorPanel from './NavAvatorPanel.vue';
    import NavPopoverPanel from './NavPopoverPanel.vue';
    import { useRouter } from 'vue-router';
    const router = useRouter()
    
    // 状态管理
    const store = inject('store');
    function _avatorpanelshow(ishow) {
        store._nav_avatorpanelshow(ishow);
    }

    function _popoverpaneltarget(target) {
        store._nav_popoverpaneltarget(target);
    }
    function _popoverpanelshow(isshow) {
        store._nav_popoverpanelshow(isshow);
    }

    //搜索和分类跳转
    function _jumptokind(parameter) {
        parameter=parameter.replace(/^\s+|\s+$/g,"");
        if(parameter=="") {
            parameter="全部";
        }
        //此处parameter要传给后端，这里略过
        this.searchboxtext = "";
        router.push({
            name:'SearchNTag',
            params:{
                title:parameter
            }
        });
    }

    //首页跳转
    function _jumptohomepage() {
        router.push({
            name:'Home'
        });
    }

    // 自定义声明
    const {
        cart,
        favorite,
        history,
        message,
        service,
        search,
        
        nav_bg,
        nav_logo,
        nav_avator,
        
        nav_labels
    } = inject('resource');
    const searchboxtext = ref("");

</script>
<template>
    <div class="navigatorbody">

        <!-- 头图 -->
        <div class = "headimg">
            <img class="IMG" :src="nav_bg" alt="">
            <img class="LOGO button" :src="nav_logo" alt="" @click="_jumptohomepage()">
        </div>

        <!-- 导航栏 -->
        <div class="navigator">
            <div class="blank"></div>

            <!-- 左侧 -->
            <div class="labels">
                <li class="button" v-for="item in nav_labels" @click="_jumptokind(item.name)">{{ item.name }}</li>
            </div>
            <div class="blank2"></div>

            <!-- 搜索框 -->
            <div class="searchbox">
                <div>
                    <input type="text" class="searchimput" name="searchtext" v-model="searchboxtext">
                    <Icons class="searchbutton button" @click="_jumptokind(searchboxtext)"><search /></Icons> 
                </div>
            </div>
            <div class="blank2"></div>

            <!-- 右侧 -->
            <div class="usersetting">

                <!-- 用户菜单 -->
                <li><div class="avator" @mouseover="_avatorpanelshow(true)" @mouseleave="_avatorpanelshow(false)">
                    <img :src="nav_avator" alt="" class="avatorimg">
                    <NavAvatorPanel class="avatorpanel" :hidden = "!store.state.nav_avatorpanelshow"></NavAvatorPanel>
                </div></li>

                <ul>
                    <div @mouseleave="_popoverpanelshow(false)">
                        <div><NavPopoverPanel class="popoverpanel" :style="'left:' + store.state.nav_popoverpanelpos + 'px;'" :hidden = "!store.state.nav_popoverpanelshow"></NavPopoverPanel></div>
                        <li @mouseover="_popoverpaneltarget('cart');_popoverpanelshow(true)">
                            <Icons class="cart"><cart /></Icons> 
                        </li>
                        <li @mouseover="_popoverpaneltarget('favorites');_popoverpanelshow(true)">
                            <Icons class="favorites"><favorite /></Icons> 
                        </li>
                        <li @mouseover="_popoverpaneltarget('history');_popoverpanelshow(true)">
                            <Icons class="history"><history /></Icons> 
                        </li>
                    </div>
                    <li>
                        <Icons class="massages"><message /></Icons> 
                    </li>
                    <li>
                        <Icons class="nav_service"><service /></Icons> 
                    </li>
                </ul>
            </div>
            <div class="blank"></div>
            
        </div>
    </div>
</template>
<style scoped>
    @import url(../../css/NavigatorPC.css);
</style>