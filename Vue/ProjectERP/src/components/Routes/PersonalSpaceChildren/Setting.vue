<script setup>
import { inject,ref } from 'vue';
    
    // 状态管理
    const store = inject('store');
    function _spc_leftbarselected(selected) {
        store._spc_leftbarselected(selected);
    }
    //刷新时保持左侧菜单栏选项
    _spc_leftbarselected(5);

    //请求用户信息
    const user = ref({
        userid:'',
        avator:'',
        user_name:'',
        aboutme:'',
        sex:-1,
        date:['','',''],
        address:[{
            id:'',
            name:'',
            address:'',
            phone:''
        }]
    })
</script>

<template>
    <div class="settingbody">
        <div class="title">设置管理</div>
        <div class="cutline"></div>
        <!-- 个人信息 -->
        <div class="userinfo">
            <div class="subtitle">个人信息</div>
            <div class="avator cell">
                <div class="text">编辑头像</div>
                <img class="img" :src="user.avator" alt="">
            </div>
            <div class="username cell">
                <div class="text">昵称</div>
                <input class="nameinput" type="text" v-model="user.user_name">
            </div>
            <div class="aboutme cell">
                <div class="text">自我介绍</div>
                <textarea class="aboutmeinput" type="text" v-model="user.aboutme"></textarea>
            </div>
            <div class="sex cell">
                <div class="text">性别</div>
                <input class="sexinput" type="radio" name="sex" :checked="user.sex==1">
                <div class="sexlabel">男</div>
                <input class="sexinput" type="radio" name="sex" :checked="user.sex==0">
                <div class="sexlabel">女</div>
                <input class="sexinput" type="radio" name="sex" :checked="user.sex==-1">
                <div class="sexlabel">保密</div>
            </div>
            <div class="date cell">
                <div class="text">生日</div>
                <input class="dateinput year" type="number" v-model="user.date[0]">
                <div class="datelabel">年</div>
                <input class="dateinput month" type="number" v-model="user.date[1]">
                <div class="datelabel">月</div>
                <input class="dateinput day" type="number" v-model="user.date[2]">
                <div class="datelabel">日</div>
            </div>
            <div class="submit button">确认修改</div>
        </div>
        <div class="cutline"></div>
        <!-- 收货地址 -->
        <div class="address">
            <div class="subtitlenadd">
                <div class="subtitle">收货地址</div>
                <div class="addaddress button">添加新地址</div>
            </div>
            <div class="addresstable">
                <div class="tablehead tableline">
                    <div class="tablecell name">收货人</div>
                    <div class="tablecell detial">地址</div>
                    <div class="tablecell phone">联系电话</div>
                    <div class="command"></div>
                </div>
                <div class="tableline" v-for="item in user.address">
                    <div class="tablecell name">{{ item.name }}</div>
                    <div class="tablecell detial">{{ item.address }}</div>
                    <div class="tablecell phone">{{ item.phone }}</div>
                    <div class="command">
                        <div class="change button">修改</div>
                        <div class="delete button">删除</div>
                        <div class="default button">设为默认</div>
                    </div>
                </div>
            </div>
            <div class="submit button">确认修改</div>
        </div>
        <div class="cutline"></div>
        <!-- 修改密码 -->
        <div class="password">
            <div class="subtitle">修改密码</div>
            <div class="oldpassword cell">
                <div class="text">旧密码</div>
                <input class="passwordinput" type="password">
            </div>
            <div class="newpassword cell">
                <div class="text">新密码</div>
                <input class="passwordinput" type="password">
            </div>
            <div class="confirmpassword cell">
                <div class="text">确认密码</div>
                <input class="passwordinput" type="password">
            </div>
            <div class="submit button">确认修改</div>
        </div>
        <div class="cutline"></div>
        <!-- 帐号管理 -->
        <div class="acountmanage">
            <div class="subtitle">帐号管理</div>
            <div class="command">
                <div class="changeaccount button">切换帐号</div>
                <div class="deleteaccount button">注销帐号</div>
            </div>
        </div>
    </div>
</template>
    
<style scoped>
    @import url(../../../css/Setting.css);
</style>