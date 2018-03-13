// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueLazyload from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll';
import {currency} from './util/currency';
import store from './store/index';

Vue.use(VueLazyload, {
    loading: '/static/loading-svg/loading-bars.svg'
});
Vue.use(infiniteScroll);
Vue.filter('currency', currency);

Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.status === 10001) {
        router.push('/');
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
