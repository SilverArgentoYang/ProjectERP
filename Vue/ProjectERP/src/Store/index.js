//状态管理仓库
import {reactive} from 'vue'

//仓库本体
const store = {
    //这里放状态
    state:reactive({
        nav_avatorpanelshow : false,

        nav_popoverpanelshow :false,
        nav_popoverpaneltarget : "none",
        nav_popoverpanelpos : 25,
        nav_popoverpaneltargets : {
            "none" : 0,
            "cart" : 0,
            "favorites" : 1,
            "history" : 2
        }
    }),

    //这里控制状态的方法
    _nav_avatorpanelshow : function(isshow) {
        this.state.nav_avatorpanelshow = isshow;
    },

    _nav_popoverpaneltarget : function(target) {
        this.state.nav_popoverpaneltarget = target;
        this.state.nav_popoverpanelpos = this.state.nav_popoverpaneltargets[target] * 50 + 25;
    },

    _nav_popoverpanelshow : function(isshow) {
        this.state.nav_popoverpanelshow = isshow;
    }

}

export default store;