<script setup>
    import None from './Icons/None.vue';
    //传值导入
    const props = defineProps({
        width: {
            type: [Number, String],
            default: 18
        },
        height: {
            type: [Number, String],
            default: 18
        },
        vx: {
            type: [Number, String],
            default: 48
        },
        vy: {
            type: [Number, String],
            default: 48
        },
        color: {
            type: String,
            default: '#ffffff'
        },
        IsInList: {
            type: Object,
            default:None
        }
    })
</script>

<template>
    <svg :width="width" :height="height" :viewBox="'0 0 '+vx+' '+vy" :fill="color">
        <slot><IsInList /></slot>
    </svg>
</template>