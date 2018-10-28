import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// create state that holds data
const state = {
    // testing
    currentUser: null
}

// update state data through mutations
const mutations = {
    SET_USER(state, user) {
        state.currentUser = user;
    }
}

// create actions for mutations with necessary data
const actions = {
    setUser(state, user) {
        state.commit('SET_USER', user);
    }
}

// get data from state
const getters = {
    currentUser: state => state.currentUser
}

// create vuex store
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store