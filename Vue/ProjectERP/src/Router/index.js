import {createRouter,createWebHashHistory} from 'vue-router';

import HomePage from '../components/Routes/HomePage.vue';
import KindPage from '../components/Routes/KindPage.vue';
import DetialPage from '../components/Routes/DetialPage.vue';
import PersonalSpace from '../components/Routes/PersonalSpace.vue';
import OrderManage from '../components/Routes/PersonalSpaceChildren/OrderManage.vue';
import Cart from '../components/Routes/PersonalSpaceChildren/Cart.vue';
import Favorite from '../components/Routes/PersonalSpaceChildren/Favorite.vue';
import History from '../components/Routes/PersonalSpaceChildren/History.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
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
            {path:"History",name:'History',component:History,props:true},
        ]
    },
    {path:"/:path(.*)",component:NotFound}
];

const router = createRouter({
    history:createWebHashHistory(),
    routes:routes
});

export default router;