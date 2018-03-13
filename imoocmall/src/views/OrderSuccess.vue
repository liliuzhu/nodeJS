<template>
    <div>
        <nav-header/>
        <nav-bread>
            <span>确认订单</span>
        </nav-bread>
        <div class="container">
            <div class="page-title-normal">
                <!--<h2 class="page-title-h2"><span>check out</span></h2>-->
            </div>
            <!-- 进度条 -->
            <check-step :step="3"/>

            <div class="order-create">
                <div class="order-create-pic"><img src="../../static/ok-2.png" alt=""></div>
                <div class="order-create-main">
                    <h3>祝贺你! <br>您的订单正在处理中!</h3>
                    <p>
                        <span>订单号：{{orderId}}</span>
                        <span>订单金额：{{orderTotal | currency('¥')}}</span>
                    </p>
                    <div class="order-create-btn-wrap">
                        <div class="btn-l-wrap">
                            <router-link to="/cart" class="btn btn--m">购物车列表</router-link>
                            <a href="javascript:;"></a>
                        </div>
                        <div class="btn-r-wrap">
                            <router-link to="/goodsList" class="btn btn--m">商品列表</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav-footer/>
    </div>
</template>
<script type="text/ecmascript-6">
    import NavHeader from './../components/NavHeader';
    import NavFooter from './../components/NavFooter';
    import NavBread from './../components/NavBread';
    import CheckStep from './../components/CheckStep';

    export default {
        name: "",
        data() {
            return {
                orderId: '',
                orderTotal: 0
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let orderId = this.$route.query.orderId;
                if (!orderId) {
                    alert('没有获取到订单号');
                    return;
                }
                this.$ajax.get('/users/orderDetail', {params: {orderId}})
                    .then(res => {
                        if (res.data.status === 0) {
                            this.orderId = res.data.result.orderId;
                            this.orderTotal = res.data.result.orderTotal;
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        },
        components: {
            NavHeader,
            NavFooter,
            NavBread,
            CheckStep
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">

</style>
