<template>
    <div class="container">
        <span class="title">{{ title }}</span>
        <div class="digital-container">
        <span class="single-digit">
            {{ leftDigit }}
        </span>
        <span class="single-digit">
            {{ rightDigit }}
        </span>
        </div>
    </div>
</template>

<script setup>
import { computed} from 'vue'

const props = defineProps({
    digit: {
        type: Number,
        require: true,
    },
    title: {
        type: String,
        require: false,
    }
});
const leftDigit = computed(() => props.digit.value >= 10 ? props.digit.value.toString()[0] : '0')
const rightDigit = computed(() => props.digit.value >= 10 ? props.digit.value.toString()[1] : props.digit.value.toString())

</script>
<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 5px;
    }
    .container:first-child {
        margin-left: 0;
    }
    .title {
        font-size: 12px;
        margin-bottom: 5px;    
    }
    .digital-container {
        display: flex;
        flex-direction: row;
        padding: 0;
    }
    .single-digit {
        position: relative;
        display: flex;
        flex: 0 1 25%;
        font-size: 30px;
        background-color: #404549;
        border-radius: 5px;
        padding: 10px 12px;
        color: white;        
    }
    .single-digit:first-child {  
        margin-right: 2px;
    }
    .single-digit:after {  
        position: absolute;
        left: 0px;
        right: 0px;
        top: 50%;
        bottom: 50%;
        content: "";
        width: '100%';
        height: 2px;
        background-color: #232323;
        opacity: 0.4;
    }
</style>