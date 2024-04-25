<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
    //resouces
    const {close} = inject('resource');
    //store
    const store = inject('store');
    function _fav_command(params) {
        store._fav_command(params);
    }
    function _fav_commandhistoryadd(id) {
        store._fav_commandhistoryadd(id);
    }
    //import
    const router = useRouter();
    //传值导入
    const props = defineProps({
        good : {
            type:Object,
            default:{
                id:'',
                img:"",
                realprice:"0.00",
                fakeprice:"0.00",
                name:"notfound"
            }
        }
    });

    //跳转详情页
    function _jumptodetial(goodid){
        router.push({
            name:'Detial',
            params:{
                goodid:goodid
            }
        });
    }

    //关闭按钮显示
    _fav_command(false);
    //删除
    function deletethis() {
        _fav_commandhistoryadd(props.good.id);
        document.getElementById('main'+props.good.id).remove();
    }
</script>

<template>
    <div :id="'main'+props.good.id" class="Itembody">
        <div class="mask" v-show="store.state.fav_command">
            <div class="delete button">
                <Icons class="icon" @click="deletethis()"><close /></Icons>
            </div>
        </div>
        <div class="button" @click="_jumptodetial(good.id)">
            <img :src="good.img" alt="" class="img">
            <div class="price">
                <div class="realprice">￥{{good.realprice}}</div>
                <div class="fakeprice">￥{{good.fakeprice}}</div>
            </div>
            <div class="name">{{good.name}}</div>
        </div>
    </div>
</template>

<style scoped>
    .Itembody {
        width: 280px;
        height: 235px;
    }

    .img {
        width: 280px;
        height: 160px;
        border-radius: 10px;
        object-fit:cover;
    }

    .price {
        width: 100%;
        height: 35px;
        line-height: 35px;
        font-size: 17px;
    }
    .realprice {
        float: left;
        color: var(--colorred);
    }
    .fakeprice {
        float: right;
        color: var(--colorgrey);
        text-decoration: line-through;
    }

    .name {
        height: 40px;
        font-size: 13px;
        line-height: 20px;
        color: var(--colordgrey);
        text-align: justify;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .mask {
        position: absolute;
        width: 280px;
        height: 235px;
        display: flex;
        justify-content: end;
        align-items: start;
    }
    .mask>.delete {
        width: 35px;
        height: 35px;
        border-radius: 5px;
        background-color: var(--shadowblack);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .mask>.delete>.icon {
        width: 30px;
        height: 30px;
    }

    @media only screen and (max-width: 1680px) {
        .Itembody {
            width: 280rem;
            height: 235rem;
        }

        .img {
            width: 280rem;
            height: 160rem;
        }

        .price {
            height: 35rem;
            line-height: 35rem;
            font-size: 17rem;
        }
        .name {
            height: 40rem;
            font-size: 13rem;
            line-height: 20rem;
        }
        .mask {
            width: 280rem;
            height: 235rem;
        }
        .mask>.delete {
            width: 35rem;
            height: 35rem;
        }
        .mask>.delete>.icon {
            width: 30rem;
            height: 30rem;
        }
    }
</style>