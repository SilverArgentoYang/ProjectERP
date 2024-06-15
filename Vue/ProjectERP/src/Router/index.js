import {createRouter,createWebHashHistory} from 'vue-router';

import MainPage from '../components/MainPage.vue';
import HomePage from '../components/Routes/HomePage.vue';
import KindPage from '../components/Routes/KindPage.vue';
import DetialPage from '../components/Routes/DetialPage.vue';
import PersonalSpace from '../components/Routes/PersonalSpace.vue';
import OrderManage from '../components/Routes/PersonalSpaceChildren/OrderManage.vue';
import Cart from '../components/Routes/PersonalSpaceChildren/Cart.vue';
import Favorite from '../components/Routes/PersonalSpaceChildren/Favorite.vue';
import History from '../components/Routes/PersonalSpaceChildren/History.vue';
import NotFound from '../components/NotFound.vue';
import Message from '../components/Routes/PersonalSpaceChildren/Message.vue';
import Setting from '../components/Routes/PersonalSpaceChildren/Setting.vue';

import Backstage from '../components/Backstage/BackstageMain.vue';
import BackstageHome from '../components/Backstage/BackstageHome.vue';
import KindListPage from '../components/Backstage/KindListPage.vue';
import GoodListPage from '../components/Backstage/GoodListPage.vue';
import TagsListPage from '../components/Backstage/TagsListPage.vue';
import OrderManagePage from '../components/Backstage/OrderManagePage.vue';
import DeliveryPage from '../components/Backstage/DeliveryPage.vue';
import Department from '../components/Backstage/Department.vue';
import MemberManage from "../components/Backstage/MemberManage.vue";
import UserManage from "../components/Backstage/UserManage.vue";
import ShopSetting from "../components/Backstage/ShopSetting.vue";
import SystemSetting from "../components/Backstage/SystemSetting.vue";
import DailyIncome from "../components/Backstage/DailyIncome.vue";
import MonthIncome from "../components/Backstage/MonthIncome.vue";
import YearIncome from "../components/Backstage/YearIncome.vue";
import CommentsPage from "../components/Backstage/CommentsPage.vue";
import AboutSite from "../components/Backstage/AboutSite.vue";

import LoginLogup from '../components/LoginLogup.vue';

const routes = [
    {
        path:"/ForwardStage",
        name:'ForwardStage',
        redirect:"/"
    },
    {
        path:"/",
        component:MainPage,
        children:[
            {path:"/Home",name:'Home', redirect:"/"},
            {path:"/",component:HomePage},
            {path:"/SearchNTag/:title/:titletype",name:'SearchNTag',component:KindPage,props:true},
            {path:"/Detial/:goodid",name:'Detial',component:DetialPage,props:true},
            {
                path:"/Personal",
                name:'Personal',
                component:PersonalSpace,
                props:true,
                children:[
                    {path:"OrderManage",name:'OrderManage',component:OrderManage,props:true},
                    {path:"Cart",name:'Cart',component:Cart,props:true},
                    {path:"Favorite",name:'Favorite',component:Favorite,props:true},
                    {path:"Message",name:'Message',component:Message,props:true},
                    {path:"History",name:'History',component:History,props:true},
                    {path:"Setting",name:'Setting',component:Setting,props:true},
                ]
            },
            {path:"/:path(.*)",component:NotFound}
        ]
    },
    {
        path:"/BackStage",
        name:'BackStage',
        component:Backstage,
        props:true,
        children:[
            {path:"/BackStage/BHome",name:'BHome',component:BackstageHome},
            {path:"/BackStage/BKind",name:'BKind',component:KindListPage},
            {path:"/BackStage/BGood",name:'BGood',component:GoodListPage},
            {path:"/BackStage/BTags",name:'BTags',component:TagsListPage},
            {path:"/BackStage/BOrder",name:'BOrder',component:OrderManagePage},
            {path:"/BackStage/BDelivery",name:'BDelivery',component:DeliveryPage},
            {path:"/BackStage/BDepartment",name:'BDepartment',component:Department},
            {path:"/BackStage/BMember",name:'BMember',component:MemberManage},
            {path:"/BackStage/BUser",name:'BUser',component:UserManage},
            {path:"/BackStage/BShop",name:'BShop',component:ShopSetting},
            {path:"/BackStage/BSystem",name:'BSystem',component:SystemSetting},
            {path:"/BackStage/BDaily",name:'BDaily',component:DailyIncome},
            {path:"/BackStage/BMonth",name:'BMonth',component:MonthIncome},
            {path:"/BackStage/BYear",name:'BYear',component:YearIncome},
            {path:"/BackStage/BComment",name:'BComment',component:CommentsPage},
            {path:"/BackStage/BAbout",name:'BAbout',component:AboutSite},
            {path:"/BackStage/:path(.*)",component:NotFound}
        ]
    },
    {path:"/LoginLogup",name:'LoginLogup',component:LoginLogup},
];

const router = createRouter({
    history:createWebHashHistory(),
    routes:routes
});

export default router;