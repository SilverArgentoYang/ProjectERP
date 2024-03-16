import {createRouter,createWebHashHistory} from 'vue-router';

import HomePage from '../components/PC/Routes/HomePage.vue';
import KindPage from '../components/PC/Routes/KindPage.vue';
import DetialPage from '../components/PC/Routes/DetialPage.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
    {path:"/Home",name:'Home', redirect:"/"},
    {path:"/",component:HomePage},
    {path:"/SearchNTag/:title/:titletype",name:'SearchNTag',component:KindPage,props:true},
    {path:"/Detial",name:'Detial',component:DetialPage,props:true},
    {path:"/:path(.*)",component:NotFound}
];

const router = createRouter({
    history:createWebHashHistory(),
    routes:routes
});

export default router;