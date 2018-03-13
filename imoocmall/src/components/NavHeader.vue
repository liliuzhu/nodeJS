<template>
    <header class="header">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
            <defs>
                <symbol id="icon-arrow-short" viewBox="0 0 25 32"><title>arrow-short</title>
                    <path
                        d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"
                        class="path1"></path>
                </symbol>
                <symbol id="icon-arrow-down-2" viewBox="0 0 59 32"><title>arrow-down</title>
                    <path
                        d="M27.448 27.448h3.771l-26.667-26.667c-1.041-1.041-2.73-1.041-3.771 0s-1.041 2.73 0 3.771l26.667 26.667c1.041 1.041 2.73 1.041 3.771 0l26.667-26.667c1.041-1.041 1.041-2.73 0-3.771s-2.73-1.041-3.771 0l-26.667 26.667z"
                        class="path1"></path>
                </symbol>
                <symbol id="icon-status-ok" viewBox="0 0 32 32"><title>status-ok</title>
                    <path
                        d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"
                        class="path1"></path>
                    <path
                        d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"
                        class="path2"></path>
                </symbol>
                <symbol id="icon-cart" viewBox="0 0 38 32">
                    <title>cart</title>
                    <path class="path1"
                          d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
                    <path class="path2"
                          d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
                    <path class="path3"
                          d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
                    <path class="path4"
                          d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
                </symbol>
            </defs>
        </svg>
        <div class="navbar">
            <div class="navbar-left-container">
                <a href="/">
                    <img class="navbar-brand-logo" src="static/logo.png">
                </a>
            </div>
            <div class="navbar-right-container" style="display: flex;">
                <div class="navbar-menu-container">
                    <!--<a href="/" class="navbar-link">我的账户</a>-->
                    <span class="navbar-link" v-show="nickName">{{nickName}}</span>
                    <a v-if="!nickName" href="javascript:void(0)" class="navbar-link"
                       @click="loginModalFlag=true;">登录</a>
                    <a v-else href="javascript:void(0)" class="navbar-link" @click="logoutModalFlag=true;">退出</a>
                    <div class="navbar-cart-container">
                        <span class="navbar-cart-count" v-if="cartCount">{{cartCount}}</span>
                        <router-link class="navbar-link navbar-cart-link" to="/cart">
                            <svg class="navbar-cart-logo">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                            </svg>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':loginModalFlag}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">登录</div>
                    <button class="md-close" @click="loginModalFlag=false;">关闭</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <div class="error-wrap">
                            <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
                        </div>
                        <ul>
                            <li class="regi_form_input">
                                <i class="icon IconPeople"></i>
                                <input type="text" tabindex="1" name="userName"
                                       class="regi_login_input regi_login_input_left" placeholder="用户名"
                                       data-type="userName" v-model="userName">
                            </li>
                            <li class="regi_form_input noMargin">
                                <i class="icon IconPwd"></i>
                                <input type="password" tabindex="2" name="password"
                                       class="regi_login_input regi_login_input_left login-input-no input_text"
                                       placeholder="密码" v-model="userPwd" @keyup.enter="login">
                            </li>
                        </ul>
                    </div>
                    <div class="login-wrap">
                        <a href="javascript:;" @click="login" class="btn-login">登 录</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="loginModalFlag" @click="loginModalFlag=false;"></div>
        <modal :mdShow="logoutModalFlag" @close="logoutModalFlag = false;">
            <p slot="msg">确定要退出登录吗？</p>
            <div slot="btnGroup">
                <a class="btn btn--m btn--red" href="javascript:;" @click="logout">确认</a>
                <a class="btn btn--m" href="javascript:;" @click="logoutModalFlag = false">关闭</a>
            </div>
        </modal>
    </header>
</template>
<script type="text/ecmascript-6">
    import '../assets/css/login.css';
    import Modal from '@/components/Modal';
    import {mapGetters} from 'vuex';

    export default {
        name: "",
        data() {
            return {
                userName: 'tom',
                userPwd: '123456',
                errorTip: false,
                loginModalFlag: false,
                logoutModalFlag: false
            };
        },
        computed: {
            ...mapGetters(['nickName', 'cartCount'])
        },
        mounted() {
            this.checkLogin();
        },
        methods: {
            checkLogin() {
                this.$ajax.get('/users/checkLogin')
                    .then((res) => {
                        let resp = res.data;
                        if (resp.status === 0) {
                            // this.nickName = resp.result;
                            this.$store.dispatch('updateNickName', resp.result);
                            this.getCartCount();
                        }
                    })
                    .catch((err) => {
                        console.error(err.message);
                    });
            },
            login() {
                if (!this.userName || !this.userPwd) {
                    this.errorTip = true;
                    return;
                }
                let data = {
                    userName: this.userName,
                    userPwd: this.userPwd
                };
                this.$ajax.post('/users/login', data)
                    .then((res) => {
                        let resp = res.data;
                        if (resp.status === 0) {
                            this.errorTip = false;
                            this.loginModalFlag = false;
                            // this.nickName = resp.result.userName;
                            this.$store.dispatch('updateNickName', resp.result.userName);
                            this.getCartCount();
                        } else {
                            this.errorTip = true;
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            },
            logout() {
                this.$ajax.post('/users/logout')
                    .then((res) => {
                        if (res.data.status === 0) {
                            this.logoutModalFlag = false;
                            // this.nickName = '';
                            this.$store.dispatch('updateNickName', '');
                            this.$store.dispatch('initCartCount', 0);
                            this.$router.push('/');
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            },
            getCartCount() {
                this.$ajax.get('/users/getCartCount')
                    .then(res => {
                        if (res.data.status === 0) {
                            this.$store.dispatch('initCartCount', res.data.result);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        },
        components: {
            Modal
        }
    };
</script>
<style rel="stylesheet/css" type="text/css" lang="less">
    .header {
        width: 100%;
        background-color: #fff;
        font-family: moderat, sans-serif;
        font-size: 16px
    }

    .navbar {
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-line-pack: center;
        align-content: center;
        width: 100%;
        height: 70px;
        max-width: 1280px;
        margin: 0 auto;
        padding: 5px 20px 10px
    }

    .navbar, .navbar-left-container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex
    }

    .navbar-left-container {
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-left: -20px
    }

    .navbar-right-container {
        display: none;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start
    }

    .navbar-menu-container, .navbar-right-container {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center
    }

    .navbar-menu-container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        padding-top: 10px
    }

    .navbar-link {
        padding-left: 15px
    }

    .navbar-cart-container {
        position: relative
    }

    .navbar-cart-count {
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: absolute;
        top: -9px;
        right: -11px;
        width: 20px;
        border-radius: 10px;
        color: #fff;
        background-color: #eb767d;
        font-size: 16px;
        font-weight: 700;
        text-align: center
    }

    .navbar-cart-logo {
        width: 25px;
        height: 25px;
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1)
    }
</style>
