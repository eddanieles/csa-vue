import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase'

// import store from './store';
import Widget from './components/Widget/Widget';
import layoutMixin from './mixins/layout';
import BootstrapVue from 'bootstrap-vue';

Vue.component('Widget', Widget);
Vue.mixin(layoutMixin);
Vue.use(BootstrapVue);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

    if (requiresAuth && !auth.currentUser) {
        next('/')
    } else {
        next()
    }
})

let app
auth.onAuthStateChanged(() => {
    if (!app) {
        new Vue({
            router,
            // store,
            render: h => h(App),
        }).$mount('#app')
    }
})