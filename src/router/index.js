import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage'
import Dashboard from '../views/Dashboard'
import Candidates from '../views/Candidates'
import SocialCauses from '../views/SocialCauses'
import HelloWorld from '../components/HelloWorld'

Vue.use(VueRouter)

const routes = [{
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
        path: '/:id/dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:id/candidates',
        component: Candidates,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:id/socialcauses/',
        component: SocialCauses,
        meta: {
            requiresAuth: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router