<script setup>
    
    //传值导入
    const props = defineProps({
        item: {
            type : Object,
            default : {
                img:"",
                name : ""
            }
        }
    });

</script>

<template>
    <div class="itemBody">
        <img :src="item.img" alt="" class="itemimg">
        <div class="itemname">{{ item.name }}</div>
    </div>
</template>

<style scoped>
    .itemBody {
        width: 100%;
        height: 60px;
        padding: 5px 0;
        display: flex;
    }
    
    .itemimg {
        width: 90px;
        height: 60px;
        border-radius: 5px;
        object-fit:cover;
    }
    .itemname {
        height: 40px;
        flex: 1;
        font-size: 15px;
        color: var(--colordgrey);
        line-height: 20px;
        margin-left: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
</style>