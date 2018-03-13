<template>
    <div class="check-step">
        <ul>
            <li :class="{cur:index<=step}" :title="index" v-for="(item,index) in steps" :key="index"><span>{{item}}</span></li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    import '../assets/css/checkout.css';

    export default {
        name: "",
        data() {
            return {
                steps: ['确认收货地址', '查看订单', '付款', '订单确认']
            };
        },
        props: {
            step: {
                type: Number,
                required: false,
                default: 0
            }
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">

</style>
