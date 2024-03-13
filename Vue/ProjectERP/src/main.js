import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './Router'
//全局组件引入
import Icons from './Resource/Icons.vue';

const app = createApp(App);
//全局组件注册
app.component('Icons',Icons);
//路由注册
app.use(router);
app.mount('#app');
