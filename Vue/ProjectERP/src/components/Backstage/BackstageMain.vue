<script setup>
    import { inject, ref, shallowRef } from 'vue';
    import Navigator from './Navigator.vue';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    //inject
    const store = inject('store');
    const {
        down_arrow,
        right_arrow,
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
    //侧边栏展开
    function _backstage_sidebar_title(title) {
        if(store.state.backstage_sidebar[0] != title) {
            store._backstage_sidebar(title,store.state.backstage_sidebar[1]);
        }else{
            store._backstage_sidebar(0,store.state.backstage_sidebar[1]);
        }
    }
    //侧边栏选择
    function _backstage_sidebar_subtitle(subtitle) {
        if(store.state.backstage_sidebar[1] != subtitle) {
            store._backstage_sidebar(store.state.backstage_sidebar[0],subtitle);
        }
        switch(subtitle) {
            case 1: {
                router.push({
                    name:'BKind'
                })
                break;
            }
            case 2: {
                router.push({
                    name:'BGood'
                })
                break;
            }
            case 3: {
                router.push({
                    name:'BTags'
                })
                break;
            }
            case 4: {
                router.push({
                    name:'BOrder'
                })
                break;
            }
            case 5: {
                router.push({
                    name:'BDelivery'
                })
                break;
            }
            case 6: {
                router.push({
                    name:'BDepartment'
                })
                break;
            }
          case 7: {
            router.push({
              name:'BMember'
            })
            break;
          }
          case 8: {
            router.push({
              name:'BUser'
            })
            break;
          }
        }
    }
    //返回前台
    function _returnfontstage() {
        store._gotopath(0);
        router.push({
            name:'Home'
        });
    }
</script>

<template>
    <div class="top">
        <div class="button logo" @click="_returnfontstage()">
            <img class="img" :src="nav_logo" alt="">
        </div>
        <Navigator class="navigator"></Navigator>
    </div>
    <div class="mainbody">
        <div class="sidebar">
            <div class="sidebaritem">
                <div class="button sidebartitleitem" @click="_backstage_sidebar_title(1)">
                    <div class="text">商品管理</div>
                    <Icons class="icon"
                        :IsInList="store.state.backstage_sidebar[0]==1?down_arrow:right_arrow"
                    ></Icons>
                </div>
                    <div :class="{
                            'sidebarsubitem':true,
                            'button':true,
                            'sidebarsubitemactive':store.state.backstage_sidebar[1]==1
                        }"
                        v-show="store.state.backstage_sidebar[0]==1"
                        @click="_backstage_sidebar_subtitle(1)"
                    >分类列表</div>
                    <div :class="{
                            'sidebarsubitem':true,
                            'button':true,
                            'sidebarsubitemactive':store.state.backstage_sidebar[1]==2
                        }"
                        v-show="store.state.backstage_sidebar[0]==1"
                        @click="_backstage_sidebar_subtitle(2)"
                    >商品列表</div>
                    <div :class="{
                            'sidebarsubitem':true,
                            'button':true,
                            'sidebarsubitemactive':store.state.backstage_sidebar[1]==3
                        }"
                        v-show="store.state.backstage_sidebar[0]==1"
                        @click="_backstage_sidebar_subtitle(3)"
                    >标签列表</div>
                <div class="button sidebartitleitem" @click="_backstage_sidebar_title(2)">
                    <div class="text">订单管理</div>
                    <Icons class="icon"
                        :IsInList="store.state.backstage_sidebar[0]==2?down_arrow:right_arrow"
                    ></Icons>
                </div>
                    <div :class="{
                            'sidebarsubitem':true,
                            'button':true,
                            'sidebarsubitemactive':store.state.backstage_sidebar[1]==4
                        }"
                        v-show="store.state.backstage_sidebar[0]==2"
                        @click="_backstage_sidebar_subtitle(4)"
                    >订单列表</div>
                    <div :class="{
                            'sidebarsubitem':true,
                            'button':true,
                            'sidebarsubitemactive':store.state.backstage_sidebar[1]==5
                        }"
                        v-show="store.state.backstage_sidebar[0]==2"
                        @click="_backstage_sidebar_subtitle(5)"
                    >物流列表</div>
                <div class="button sidebartitleitem" @click="_backstage_sidebar_title(3)">
                    <div class="text">帐号管理</div>
                    <Icons class="icon"
                        :IsInList="store.state.backstage_sidebar[0]==3?down_arrow:right_arrow"
                    ></Icons>
                </div>
                    <div :class="{
                            'sidebarsubitem':true,
                            'button':true,
                            'sidebarsubitemactive':store.state.backstage_sidebar[1]==6
                        }"
                        v-show="store.state.backstage_sidebar[0]==3"
                        @click="_backstage_sidebar_subtitle(6)"
                    >部门管理</div>
                    <div :class="{
                            'sidebarsubitem':true,
                            'button':true,
                            'sidebarsubitemactive':store.state.backstage_sidebar[1]==7
                        }"
                        v-show="store.state.backstage_sidebar[0]==3"
                        @click="_backstage_sidebar_subtitle(7)"
                    >员工管理</div>
                    <div :class="{
                            'sidebarsubitem':true,
                            'button':true,
                            'sidebarsubitemactive':store.state.backstage_sidebar[1]==8
                        }"
                        v-show="store.state.backstage_sidebar[0]==3"
                        @click="_backstage_sidebar_subtitle(8)"
                    >会员管理</div>
                <div class="button sidebartitleitem" @click="_backstage_sidebar_title(4)">
                    <div class="text">设置管理</div>
                    <Icons class="icon"
                        :IsInList="store.state.backstage_sidebar[0]==4?down_arrow:right_arrow"
                    ></Icons>
                </div>
                    <div :class="{
                            'sidebarsubitem':true,
                            'button':true,
                            'sidebarsubitemactive':store.state.backstage_sidebar[1]==9
                        }"
                        v-show="store.state.backstage_sidebar[0]==4"
                        @click="_backstage_sidebar_subtitle(9)"
                    >店铺设置</div>
                    <div :class="{
                            'sidebarsubitem':true,
                            'button':true,
                            'sidebarsubitemactive':store.state.backstage_sidebar[1]==10
                        }"
                        v-show="store.state.backstage_sidebar[0]==4"
                        @click="_backstage_sidebar_subtitle(10)"
                    >系统设置</div>
                    <div :class="{
                            'sidebarsubitem':true,
                            'button':true,
                            'sidebarsubitemactive':store.state.backstage_sidebar[1]==11
                        }"
                        v-show="store.state.backstage_sidebar[0]==4"
                        @click="_backstage_sidebar_subtitle(11)"
                    >支付设置</div>
                <div class="button sidebartitleitem" @click="_backstage_sidebar_title(5)">
                    <div class="text">财务账单</div>
                    <Icons class="icon"
                        :IsInList="store.state.backstage_sidebar[0]==5?down_arrow:right_arrow"
                    ></Icons>
                </div>
                <div class="button sidebartitleitem" @click="_backstage_sidebar_title(6)">
                    <div class="text">数据管理</div>
                    <Icons class="icon"
                        :IsInList="store.state.backstage_sidebar[0]==6?down_arrow:right_arrow"
                    ></Icons>
                </div>
                <div class="button sidebartitleitem" @click="_backstage_sidebar_title(7)">
                    <div class="text">消息管理</div>
                    <Icons class="icon"
                        :IsInList="store.state.backstage_sidebar[0]==7?down_arrow:right_arrow"
                    ></Icons>
                </div>
            </div>
        </div>

        <router-view class="mainarea"></router-view>
    </div>
</template>
    
<style scoped>
    @import url(../../css/Backstage/MainPage.css);
</style>