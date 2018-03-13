import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    nickName: '',
    cartCount: 0
};
const mutations = {
    updateNickName(state, nickName) {
        state.nickName = nickName;
    },
    updateCartCount(state, cartCount) {
        state.cartCount += cartCount;
    },
    initCartCount(state, cartCount) {
        state.cartCount = cartCount;
    }
};
const actions = {
    updateNickName({commit}, nickName) {
        commit('updateNickName', nickName);
    },
    updateCartCount({commit}, cartCount) {
        commit('updateCartCount', cartCount);
    },
    initCartCount({commit}, cartCount) {
        commit('initCartCount', cartCount);
    }
};
const getters = {
    nickName(state) {
        return state.nickName;
    },
    cartCount(state) {
        return state.cartCount;
    }
};

const store = new Vuex.Store({state, actions, mutations, getters});

export default store;
