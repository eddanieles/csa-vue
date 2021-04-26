import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage'
import Dashboard from '../views/Dashboard'
import Candidates from '../views/Candidates'
import SocialCauses from '../views/SocialCauses'
import HelloWorld from '../components/HelloWorld'
import Layout from '../components/Layout/Layout'
import { auth } from '.././firebase'
// import store from '.././store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            component: HelloWorld,
            props: true
        },
        {
            path: '/:id',
            component: LoginPage,
            props: true
        },
        {
            path: '/:id/app',
            name: Layout,
            component: Layout,
            children: [{
                    path: 'dashboard',
                    component: Dashboard,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'candidates',
                    component: Candidates,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'socialcauses',
                    component: SocialCauses
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

    if (requiresAuth && !auth.currentUser) {
        next('/')
    } else {
        next()
    }
})


export default router