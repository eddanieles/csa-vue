import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase'

import store from './store';
import Widget from './components/Widget/Widget';
import layoutMixin from './mixins/layout';
import BootstrapVue from 'bootstrap-vue';
import Trend from 'vuetrend';
import VueTouch from 'vue-touch';

Vue.component('Widget', Widget);
Vue.mixin(layoutMixin);
Vue.use(BootstrapVue);
Vue.use(Trend);
Vue.use(VueTouch);

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(() => {
    if (!app) {
        new Vue({
            router,
            store,
            render: h => h(App),
        }).$mount('#app')
    }
})