<script setup>
import axios from 'axios';
import { inject, ref } from 'vue';


    //inject
    const store = inject('store');

    const props = defineProps({
        inputs:{
            type:Array,
            defualt:[{
                type:'text',
                text:'Undefind',
                defualtvalue:''
            }]
        },
        posturl:{
            type:String,
            defualt:''
        },
        key:{
            type:String,
            defualt:''
        }
    });
    const values = ref([]);
    props.inputs.forEach(item => {
        values.value.push(item.defualtvalue);
    });

    //emit
    const emit = defineEmits(['confirm']);

    //确认
    function _confirm() {
        axios({
            url:props.posturl,
            method:'post',
            params:{
                value0:values.value[0]?values.value[0]:null,
                value1:values.value[1]?values.value[1]:null,
                value2:values.value[2]?values.value[2]:null,
                value3:values.value[3]?values.value[3]:null,
                value4:values.value[4]?values.value[4]:null,
                value5:values.value[5]?values.value[5]:null,
                value6:values.value[6]?values.value[6]:null,
                value7:values.value[7]?values.value[7]:null,
                value8:values.value[8]?values.value[8]:null,
                value9:values.value[9]?values.value[9]:null,
            }
        }).then(res=>{
            if(res.data.success=='true'){
                emit('confirm',values.value);
                store._backstage_popovershow(false);
            }else{
                store._showmessage('内容不正确');
            }
        });
    }
    //取消
    function _cancel() {
        store._backstage_popovershow(false);
    }

    //拉取标签
    const tags = ref([]);
    function _gettags() {
        axios({
            url:'/getTagsGoods',
            method:'get',
            params:{}
        }).then(res=>{
            res.data.tags.forEach(item => {
                tags.value.push({
                    id:item.id,
                    name:item.name,
                    selected:false
                })
            });
            props.inputs.forEach((itemi) => {
                if(itemi.type=='tags'&&itemi.defualtvalue!='') {
                    itemi.defualtvalue.forEach(item => {
                        tags.value.forEach(itemj => {
                            if(item == itemj.id){
                                itemj.selected=true;
                            }
                        });
                    });
                }
            });
        })
    }
    _gettags();

    //拉取分类
    const kinds = ref([]);
    function _getkinds() {
        axios({
            url:'/getLabelsNav',
            method:'get',
            params:{}
        }).then(res=>{
            res.data.nav_labels.forEach(item => {
                kinds.value.push({
                    id:item.id,
                    name:item.name
                });
            });
        })
    }
    _getkinds();

    //修改图片
    function _changeimg(index) {
        var Uploader = document.getElementById('FileUpload');
        Uploader.click();
        Uploader.addEventListener('change',function() {
            var fileObj = Uploader.files[0];
            if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
                alert("请选择图片");
                return;
            }
            axios({
                url:'/postUploadImg',
                method:'post',
                params:{
                    img:fileObj,
                    oldimg:values.value[index]
                }
            }).then(res=>{
                values.value[index] = res.data.newimgurl;
            })
        })
    }

    //选择分类
    const kindselect = ref(-1);
    function _kindselect(index) {
        values.value[index] = kindselect.value;

    }

    //选择标签
    const tagselect = ref([]);
    function _tagselect(index,indexj,id) {
        var sindex = -1;
        tagselect.value.forEach((item,index) => {
            if(item == id) {
                sindex = index;
            }
        });
        if(sindex != -1) {
            if (tagselect.value.length <= 1) {
                tagselect.value.pop();
            }else{
                for(var i=sindex;i<tagselect.value.length-1;i++) {
                    tagselect.value[i] = tagselect.value[i+1];
                }
                tagselect.value.pop();
            }
            tags.value[indexj].selected = false;
        }else{
            tagselect.value.push(id);
            tags.value[indexj].selected = true;
        }
        values.value[index] = tagselect.value.slice();
    }

    //部门职能
    const ability = ref([]);
    const abilityselect = ref([]);
    function _getability() {
        axios({
            url:'/getDepartmentAbility',
            method:'get',
            params:{}
        }).then(res=>{
            res.data.ability.forEach(item => {
                ability.value.push({
                    id:item.id,
                    name:item.name,
                    selected:false
                })
            });
            props.inputs.forEach((itemi) => {
                if(itemi.type=='ability'&&itemi.defualtvalue!='') {
                    itemi.defualtvalue.forEach(item => {
                        ability.value.forEach(itemj => {
                            if(item == itemj.id){
                                itemj.selected=true;
                            }
                        });
                    });
                }
            });
        });
    }
    _getability();

    //部门职能选择
    function _ability(index,indexj,id) {
        var sindex = -1;
        abilityselect.value.forEach((item,index) => {
            if(item == id) {
                sindex = index;
            }
        });
        if(sindex != -1) {
            if (abilityselect.value.length <= 1) {
                abilityselect.value.pop();
            }else{
                for(var i=sindex;i<abilityselect.value.length-1;i++) {
                    abilityselect.value[i] = abilityselect.value[i+1];
                }
                abilityselect.value.pop();
            }
            ability.value[indexj].selected = false;
        }else{
            abilityselect.value.push(id);
            ability.value[indexj].selected = true;
        }
        values.value[index] = abilityselect.value.slice();
    }

    //拉取部门
    const department = ref([]);
    function _getdepartment() {
      axios({
        url:'/getDepartment',
        method:'get',
        params:{}
      }).then(res=>{
        res.data.department.forEach(item => {
          department.value.push({
            id:item.id,
            name:item.name
          });
        });
      })
    }
    _getdepartment();

    //选择部门
    const departmentselect = ref(-1);
    function _departmentselect(index) {
      values.value[index] = departmentselect.value;
    }

    //初始化分类
    function _initkind() {
        props.inputs.forEach((item) => {
            if(item.type=='kind') {
                kindselect.value = item.defualtvalue;
            }
            if(item.type=='tags'&&item.defualtvalue!='') {
                tagselect.value = item.defualtvalue.slice();
            }
            if(item.type=='ability'&&item.defualtvalue!='') {
                abilityselect.value = item.defualtvalue.slice();
            }
            if(item.type=='department'&&item.defualtvalue!='') {
              departmentselect.value = item.defualtvalue;
            }
        });
    }
    _initkind();
</script>

<template>
    <div class="popoverbody">
        <div class="title"><slot name="title"></slot></div>
        <input type="file" name="FileUpload" id="FileUpload" hidden>
        <div class="inputbox" v-for="item,index in inputs">
            <div class="text">{{item.text}}:</div>
            <input class="input" v-if="item.type=='text'" v-model="values[index]">
            <textarea class="input" v-if="item.type=='texteara'" rows="4" v-model="values[index]"/>
            <img class="inputimg" v-if="item.type=='img'"  :src="values[index]" alt="" @click="_changeimg(index)">
            <div class="input tags" v-if="item.type=='tags'">
                <div :class="{'tagitem':true,'selected':itemj.selected}" v-for="itemj,indexj in tags" @click="_tagselect(index,indexj,itemj.id)">{{ itemj.name }}</div>
            </div>
            <select class="input" v-model="kindselect" v-if="item.type=='kind'" @change="_kindselect()">
                <option v-for="(itemj,indexj) in kinds" :value="indexj">{{ itemj.name }}</option>
            </select>
            <div class="input tags" v-if="item.type=='ability'">
                <div :class="{'tagitem':true,'selected':itemj.selected}" v-for="(itemj,indexj) in ability" @click="_ability(index,indexj,itemj.id)">{{ itemj.name }}</div>
            </div>
            <select class="input" v-model="departmentselect" v-if="item.type=='department'" @change="_departmentselect(index)">
              <option v-for="(itemj,indexj) in department" :value="indexj">{{ itemj.name }}</option>
            </select>
        </div>
        <div class="command">
            <div class="commandbutton button confirm" @click="_confirm()">确认</div>
            <div class="commandbutton button cancel" @click="_cancel()">取消</div>
        </div>
    </div>
</template>
    
<style scoped>
    .popoverbody {
        width: 500px;
        box-shadow: 0 0 10px var(--shadowblack);
        border-radius: 15px;
        padding: 15px 15px;
    }
    .title {
        width: 100%;
        border-radius: 15px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
    }

    .inputbox {
        width: 100%;
        margin-top: 20px;
        display: flex;
        gap: 5px;
    }
    .inputbox>.text {
        min-width:80px;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
    }
    .inputbox>.input {
        min-height: 30px;
        flex: 1;
        border-radius: 7px;
        border: 1px solid var(--colorldgrey);
        font-size: 16px;
        padding: 5px 10px;
        box-sizing: border-box;
        resize: none;
    }
    .inputbox>.input:focus {
        outline: none;
    }
    .inputbox>.inputimg {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
    .inputbox>.tags {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
    }
    .inputbox>.tags>.tagitem {
        height: 30px;
        padding: 0 25px;
        border: 1px dashed var(--colorgrey);
        border-radius: 15px;
        line-height: 30px;
        text-align: center;
        font-size: 15px;
    }
    
    .command {
        width: 100%;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .commandbutton {
        flex: 1;
        padding: 0 25px;
        height: 35px;
        background-color: var(--colorblue);
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        color: var(--colorwhite);
        text-align: center;
        line-height: 35px;
    }
    .selected{
        background-color: var(--colordred);
        color: var(--colorwhite);
    }
    @media only screen and (max-width: 1680px) {
        .popoverbody {
            width: 500rem;
            box-shadow: 0 0 10rem var(--shadowblack);
            border-radius: 15rem;
            padding: 15rem 15rem;
        }
        .title {
            border-radius: 15rem;
            font-size: 18rem;
        }

        .inputbox {
            margin-top: 20rem;
            gap: 5rem;
        }
        .inputbox>.text {
            height: 30rem;
            font-size: 16rem;
            line-height: 30rem;
        }
        .inputbox>.input {
            min-height: 30rem;
            border-radius: 7rem;
            font-size: 16rem;
            padding: 0 10rem;
        }
        .inputbox>.inputimg {
            width: 100rem;
            height: 100rem;
        }
        .inputbox>.tags {
            padding: 10rem;
        }
        .inputbox>.tags>.tagitem {
            height: 30rem;
            padding: 0 25rem;
            border-radius: 15rem;
            line-height: 30rem;
            font-size: 15rem;
        }
        
        .command {
            margin-top: 30rem;
            gap: 5rem;
        }
        .commandbutton {
            padding: 0 25rem;
            height: 35rem;
            border-radius: 5rem;
            font-size: 16rem;
            line-height: 35rem;
        }
    }
</style>