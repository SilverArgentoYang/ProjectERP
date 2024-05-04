<script setup>
import axios from 'axios';
import { inject,ref } from 'vue';
import { useRouter } from 'vue-router';
    const router = useRouter();
    
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
            editing:false,
            isdefault:false,
            id:'',
            name:'',
            address:'',
            phone:''
        }]
    });
    function _getuserinfo() {
        axios({
            url:'/getUserMain',
            method:'get',
            params:{
                userid:localStorage.getItem('user')
            }
        }).then(res=>{
            user.value.userid = res.data.user.userid;
            user.value.avator = res.data.user.avator;
            user.value.user_name = res.data.user.user_name;
            user.value.aboutme = res.data.user.aboutme;
            user.value.sex = res.data.user.sex;
            user.value.date = res.data.user.date.slice();
            user.value.address = res.data.user.address.slice();
        })
    }
    _getuserinfo();

    // 修改头像
    function _changeavator() {
        var Uploader = document.getElementById('FileUpload');
        Uploader.click();
        Uploader.addEventListener('change',function() {
            var fileObj = Uploader.files[0];
            if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
                alert("请选择图片");
                return;
            }
            axios({
                url:'/postUpdateUserAavator',
                method:'post',
                params:{
                    useid:localStorage.getItem('user'),
                    avator:fileObj
                }
            }).then(res=>{
                user.value.avator = res.data.newavtorurl;
            })
        })
    }
    //提交数据
    function _postuserinfo() {
        var error = false;
        user.value.address.forEach(item => {
            if(item.editing) {
                alert('有地址正在编辑');
                error = true;
            }
        });
        if(error) {
            return;
        }
        axios({
            url:'/postUserInfo',
            method:'post',
            params: {
                userid:localStorage.getItem('user'),
                avator:user.value.avator,
                user_name:user.value.user_name,
                aboutme:user.value.aboutme,
                sex:user.value.sex,
                date:user.value.date,
                address:user.value.address
            }
        }).then(res=>{
            location.reload();
        })
    }
    //修改密码
    const password = ref({
        oldpassword:'',
        newpassword:'',
        confirmpassword:''
    })
    function _postuserpassword() {
        if(password.value.newpassword != '' && password.value.confirmpassword != '' && password.value.newpassword === password.value.confirmpassword) {
            axios({
                url:'/postUserPassword',
                method:'post',
                params:{
                    userid:localStorage.getItem('user'),
                    oldpassword:password.value.oldpassword,
                    newpassword:password.value.newpassword
                }
            }).then(res=>{
                if(res.data.error == '00001') {
                    alert('密码错误');
                }
            })
        }else{
            alert('密码格式错误');
        }
    }

    //添加新地址
    function _addaddress() {
        var isdefault = false;
        if(user.value.address.length == 0) {
            isdefault = true;
        }
        user.value.address.push({
            editing:true,
            isdefault:isdefault,
            id:'',
            name:'',
            address:'',
            phone:''
        })
    }
    //修改地址&确认
    function _editaddress(index) {
        if(user.value.address[index].editing) {
            if(
                user.value.address[index].name != '' &&
                user.value.address[index].address != '' &&
                user.value.address[index].phone != ''
            ) {
                user.value.address[index].editing = false;
            }else {
                alert('请完整填写收货地址');
            }
        }else{
            user.value.address[index].editing = true;
        }
    }
    //删除地址
    function _deleteaddress(index) {
        if(user.value.address[index].isdefault && user.value.address.length > 1) {
            if(index == 0) {
                user.value.address[1].isdefault = true;
            }else {
                user.value.address[0].isdefault = true;
            }
        }
        for(var i = index; i < user.value.address.length-1; i++) {
            user.value.address[i] = user.value.address[i+1];
        }
        user.value.address.pop();
    }
    //设为默认
    function _setdefault(index) {
        user.value.address.forEach(item => {
            if(item.isdefault) {
                item.isdefault = false;
            }
        });
        user.value.address[index].isdefault = true;
    }
    //切换帐号
    function _userlogout(){
        localStorage.setItem('user','null');
        store.user_islogin();
        store._user_avator('./src/Resource/Imgs/DefaultAvatar512.jpg');
        router.push({
            name:'Home'
        })
    }
    //注销帐号
    function _deleteacount() {
        if(confirm('确认要注销账户？\n警告:此操作会直接销毁账户导致此账户永久不可用!')) {
            axios({
                url:'/postDeleteAcount',
                method:'post',
                params:{
                    useid:localStorage.getItem('user')
                }
            })
            localStorage.setItem('user','null');
            store.user_islogin();
            store._user_avator('./src/Resource/Imgs/DefaultAvatar512.jpg');
            router.push({
                name:'Home'
            })
        }
    }
</script>

<template>
    <div class="settingbody">
        <div class="title">设置管理</div>
        <input type="file" name="FileUpload" id="FileUpload" hidden>
        <div class="cutline"></div>
        <!-- 个人信息 -->
        <div class="userinfo">
            <div class="subtitle">个人信息</div>
            <div class="avator cell">
                <div class="text">编辑头像</div>
                <img class="img button" :src="user.avator" alt="" @click="_changeavator()">
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
            <div class="submit button" @click="_postuserinfo()">确认修改</div>
        </div>
        <div class="cutline"></div>
        <!-- 收货地址 -->
        <div class="address">
            <div class="subtitlenadd">
                <div class="subtitle">收货地址</div>
                <div class="addaddress button" @click="_addaddress()">添加新地址</div>
            </div>
            <div class="addresstable">
                <div class="tablehead tableline">
                    <div class="tablecell name">收货人</div>
                    <div class="tablecell detial">地址</div>
                    <div class="tablecell phone">联系电话</div>
                    <div class="command"></div>
                </div>
                <div class="tableline" v-for="item,index in user.address">
                    <div class="tablecell name">
                        <div v-show="!item.editing">{{ item.name }}</div>
                        <input
                            type="text"
                            v-show="item.editing"
                            v-model="item.name"
                            style="width:80%;height:60%;text-align:center;"
                        >
                    </div>
                    <div class="tablecell detial">
                        <div v-show="!item.editing">{{ item.address }}</div>
                        <input
                            type="text"
                            v-show="item.editing"
                            v-model="item.address"
                            style="width:80%;height:60%;text-align:center;"
                        >
                    </div>
                    <div class="tablecell phone">
                        <div v-show="!item.editing">{{ item.phone }}</div>
                        <input
                            type="text"
                            v-show="item.editing"
                            v-model="item.phone"
                            style="width:80%;height:60%;text-align:center;"
                        >
                    </div>
                    <div class="command">
                        <div class="change button" @click="_editaddress(index)">
                            {{item.editing?'确认':'修改'}}
                        </div>
                        <div class="delete button" @click="_deleteaddress(index)">删除</div>
                        <div :class="{'default':true,'button':!item.isdefault,'defaulted':item.isdefault}"
                            @click="_setdefault(index)"
                        >{{item.isdefault?'默认地址':'设为默认'}}</div>
                    </div>
                </div>
            </div>
            <div class="submit button" @click="_postuserinfo()">确认修改</div>
        </div>
        <div class="cutline"></div>
        <!-- 修改密码 -->
        <div class="password">
            <div class="subtitle">修改密码</div>
            <div class="oldpassword cell">
                <div class="text">旧密码</div>
                <input class="passwordinput" type="password" v-model="password.oldpassword">
            </div>
            <div class="newpassword cell">
                <div class="text">新密码</div>
                <input class="passwordinput" type="password" v-model="password.newpassword">
            </div>
            <div class="confirmpassword cell">
                <div class="text">确认密码</div>
                <input class="passwordinput" type="password" v-model="password.confirmpassword">
            </div>
            <div class="submit button" @click="_postuserpassword()">确认修改</div>
        </div>
        <div class="cutline"></div>
        <!-- 帐号管理 -->
        <div class="acountmanage">
            <div class="subtitle">帐号管理</div>
            <div class="command">
                <div class="changeaccount button" @click="_userlogout()">切换帐号</div>
                <div class="deleteaccount button" @click="_deleteacount()">注销帐号</div>
            </div>
        </div>
    </div>
</template>
    
<style scoped>
    @import url(../../../css/Setting.css);
</style>