//状态管理仓库
import {reactive} from 'vue';

//仓库本体
const store = {
    //这里放状态
    state:reactive({
        //用户面板打开关闭
        nav_avatorpanelshow : false,
        //购物车、收藏夹、历史记录面板打开关闭
        nav_popoverpanelshow :false,
        nav_popoverpaneltarget : "none",
        nav_popoverpanelpos : 25,
        nav_popoverpaneltargets : {
            "none" : 0,
            "cart" : 0,
            "favorites" : 1,
            "history" : 2
        },
        //登录状态
        user_islogin:false,
        //个人空间左侧菜单
        spc_leftbarselected:0,
        //收藏夹历史记录管理
        fav_command:false,
        fav_commandhistory:[],
        //头像显示
        user_avator:'./src/Resource/Imgs/DefaultAvatar512.jpg'
    }),

    //这里控制状态的方法
    //用户面板打开关闭
    _nav_avatorpanelshow : function(isshow) {
        this.state.nav_avatorpanelshow = isshow;
    },
    //购物车、收藏夹、历史记录面板目标
    _nav_popoverpaneltarget : function(target) {
        this.state.nav_popoverpaneltarget = target;
        this.state.nav_popoverpanelpos = this.state.nav_popoverpaneltargets[target] * 50 + 17.5;
    },
    //购物车、收藏夹、历史记录面板打开关闭
    _nav_popoverpanelshow : function(isshow) {
        this.state.nav_popoverpanelshow = isshow;
    },
    //登录
    user_islogin :function(islogin){
        this.state.user_islogin = islogin;
    },

    //弹出浮窗
    _showmessage :function(message) {
        var messagebox = document.createElement('div');
        messagebox.textContent = message;
        messagebox.style="position:fixed;top:5%;left:50%;padding:5px;background-color:#000000;font-size:18px;color:#ffffff;transition:opacity 0.3s ease-in-out;z-index:10;border-radius:5px;opcity:0.8"
        document.body.appendChild(messagebox);
        setTimeout(function() {
            messagebox.style.opacity = 0;
            setTimeout(function() {
                document.body.removeChild(messagebox);
            },300);
        },200);
    },

    //个人空间左侧菜单
    _spc_leftbarselected :function(selected) {
        this.state.spc_leftbarselected = selected;
    },

    //收藏夹历史记录管理
    _fav_command :function(params) {
        this.state.fav_command = params;
    },
    _fav_commandhistoryadd :function(id) {
        this.state.fav_commandhistory.push(id);
    },
    _fav_commandhistoryread :function() {
        return this.state.fav_commandhistory;
    },
    _fav_commandreset :function() {
        this.state.fav_commandhistory.length = 0;
    },

    //用户头像
    _user_avator :function(avtor) {
        this.state.user_avator = avtor;
    }
}

export default store;