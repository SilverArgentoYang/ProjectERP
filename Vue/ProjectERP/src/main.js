import { createApp,} from 'vue'
import './style.css'
import App from './App.vue'
//router
import router from './Router'
//axios
import axios from 'axios'
axios.defaults.baseURL= 'http://127.0.0.1:4523/m1/4156595-0-default';
//全局组件引入
import Icons from './Resource/Icons.vue';

const app = createApp(App);
//全局组件注册
app.component('Icons',Icons);
//路由注册
app.use(router);
app.mount('#app');
