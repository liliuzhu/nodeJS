<template>
    <div class="goodsList">
        <nav-header/>
        <nav-bread>
            <span>商品列表</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">排序:</span>
                    <a href="javascript:void(0)" class="default cur">默认</a>
                    <a href="javascript:void(0)" @click="sortGoods" class="price" :class="{'sort-up':sortFlag}">价格
                        <svg class="icon icon-arrow-short">
                            <use xlink:href="#icon-arrow-short"></use>
                        </svg>
                    </a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">过滤</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
                        <dl class="filter-price">
                            <dt>价格区间:</dt>
                            <dd v-for="(price,index) in priceFilter" :key="index">
                                <a :class="{cur:priceChecked===index}" @click="setPriceFilter(index);"
                                   href="javascript:void(0)">
                                    {{price.string||(price.startPrice+' - '+price.endPrice)}}
                                </a>
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li v-for="(item,index) in goodsList" :key="index">
                                    <div class="pic">
                                        <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">&yen;{{item.salePrice}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:void(0);" class="btn btn--m"
                                               @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="load_more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                                 infinite-scroll-distance="30">
                                <!--加载中...-->
                                <img v-show="loading" src="./loading-spinning-bubbles.svg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="overLayFlay" @click="closePop"></div>
        <modal :mdShow="mdShowNotLogin" @close="closeModal">
            <p slot="msg">
                请先登录，否则无法加入到购物车中！
            </p>
            <div slot="btnGroup">
                <a href="javascript:void(0);" @click="mdShowNotLogin=false;" class="btn btn--m">关闭</a>
            </div>
        </modal>
        <modal :mdShow="mdShowCart" @close="closeModal">
            <p slot="msg">
                <svg class="icon-status-ok">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                </svg>
                <span>加入购物车成功！</span>
            </p>
            <div slot="btnGroup">
                <a href="javascript:void(0);" @click="mdShowCart=false;" class="btn btn--m">继续购物</a>
                <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
            </div>
        </modal>
        <nav-footer/>
    </div>
</template>
<script type="text/ecmascript-6">
    import '../assets/css/base.css';
    import '../assets/css/product.css';
    import NavHeader from '@/components/NavHeader';
    import NavFooter from '@/components/NavFooter';
    import NavBread from '@/components/NavBread';
    import Modal from '@/components/Modal';

    export default {
        name: "",
        data() {
            return {
                goodsList: [],
                priceFilter: [
                    {
                        string: '不限'
                    },
                    {
                        startPrice: 0,
                        endPrice: 500
                    },
                    {
                        startPrice: 500,
                        endPrice: 1000
                    },
                    {
                        startPrice: 1000,
                        endPrice: 2000
                    },
                    {
                        startPrice: 2000,
                        endPrice: 5000
                    }
                ],
                mdShowNotLogin: false,
                mdShowCart: false,
                priceChecked: 0,
                filterBy: false,
                overLayFlay: false,
                sortFlag: true,
                page: 1,
                pageSize: 8,
                loading: true,
                busy: false
            };
        },
        mounted() {
            this.getGoodsList();
        },
        methods: {
            getGoodsList(flag) {
                this.loading = true;
                let params = {
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sortFlag ? 1 : -1,
                    priceLeave: this.priceFilter[this.priceChecked]
                };
                this.$ajax.get('/goods/list', {params})
                    .then((res) => {
                        if (res.data.status === 0) {
                            if (flag) {
                                this.goodsList = this.goodsList.concat(res.data.result);
                                // this.goodsList = Array.prototype.push.apply(this.goodsList, res.data.result);
                                // console.log(this.goodsList);
                                if (res.data.result.length === 0) {
                                    this.busy = true;
                                } else {
                                    this.busy = false;
                                }
                            } else {
                                this.goodsList = res.data.result;
                                this.busy = false;
                            }
                        } else {
                            this.goodsList = [];
                        }
                        this.loading = false;
                    })
                    .catch((err) => {
                        console.error(err);
                        this.loading = false;
                    });
            },
            sortGoods() {
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.getGoodsList();
            },
            loadMore() {
                this.busy = true;
                setTimeout(() => {
                    this.page++;
                    this.getGoodsList(true);
                }, 500);
            },
            showFilterPop() {
                this.filterBy = true;
                this.overLayFlay = true;
            },
            setPriceFilter(index) {
                this.priceChecked = index;
                this.closePop();
                this.page = 1;
                this.getGoodsList();
            },
            closePop() {
                this.filterBy = false;
                this.overLayFlay = false;
            },
            closeModal() {
                this.mdShowNotLogin = false;
                this.mdShowCart = false;
            },
            addCart(productId) {
                this.$ajax.post('/goods/addCart', {productId})
                    .then((res) => {
                        if (res.data.status === 0) {
                            // alert("加入成功");
                            this.mdShowCart = true;
                            this.$store.dispatch('updateCartCount', 1);
                        } else {
                            this.mdShowNotLogin = true;
                            // alert(res.data.msg);
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        },
        components: {
            NavHeader,
            NavFooter,
            NavBread,
            Modal
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    .footer a, .header a {
        color: #666;
        text-decoration: none
    }

    .load_more {
        text-align: center;
        line-height: 100px;
    }

    .icon-arrow-short {
        transition: transform 0.2s ease-out;
    }

    .btn {
        &:hover {
            background-color: #ffe5e6;
            transition: all 0.3s ease-out;
        }
    }
</style>
