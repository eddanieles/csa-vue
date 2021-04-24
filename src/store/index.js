import Vue from 'vue'
import Vuex from 'vuex'

import layout from './layout'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        layout,
    },
    state: {
        userProfile: {},
        company: ""
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setCompanyId(state, val) {
            state.companyId = val
        }
    },
    actions: {
        async assignCompany({ commit }, companyId) {
            // set companyID in state
            commit('setCompanyId', companyId)
        },
        async login({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        },
        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get()

            // set user profile in state
            commit('setUserProfile', userProfile.data())

            // change route to dashboard
            // eslint-disable-next-line
            console.log(`User UID: ${user.uid}`)
            router.push(`/${this.state.companyId}/dashboard`)
        },
        async logout({ commit }) {
            // log user out
            await fb.auth.signOut()

            // clear user data from state
            commit('setUserProfile', {})

            // redirect to login view
            router.push('/login')
        }
    }
});