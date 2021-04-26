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
        companyId: "",
        companyProfile: {}
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setCompanyId(state, val) {
            state.companyId = val
        },
        setCompanyProfile(state, val) {
            state.companyProfile = val
        }
    },
    actions: {
        async assignCompany({ commit }, companyId) {
            // fetch company
            var companyRef = fb.companiesCollection.doc(companyId)

            companyRef.get()
                .then((company) => {
                    if (company.exists) {
                        commit('setCompanyProfile', company.data())
                            // set companyID in state
                        commit('setCompanyId', companyId)
                    } else {
                        // doc.data() will be undefined in this case
                        commit('setCompanyProfile', null)
                            // eslint-disable-next-line
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    // eslint-disable-next-line
                    console.log("Error getting document:", error);
                });



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
            router.push(`/${userProfile.data().company}/app/dashboard`)
        },
        async getAuthUserProfile({ commit }, user) {
            // fetch user profile
            var authRef = await fb.usersCollection.doc(user.uid).get()

            // set user profile in state
            commit('setUserProfile', authRef.data())
        },
        async logout({ commit }) {
            // log user out
            await fb.auth.signOut()

            // clear user data from state
            commit('setUserProfile', {})

            // redirect to login view
            router.push(`/${this.state.companyId}`)
        }
    }
});