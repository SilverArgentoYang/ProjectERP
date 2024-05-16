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
        props:true
    },
    {path:"/LoginLogup",name:'LoginLogup',component:LoginLogup},
];

const router = createRouter({
    history:createWebHashHistory(),
    routes:routes
});

export default router;