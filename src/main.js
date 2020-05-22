import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './vuex'
import {mapState} from 'vuex';
import router from './router.js'
import { BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSASINGSENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID
};
firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
new Vue({
  render: h => h(App),
  router,
  store,
  computed:{
    ...mapState({
      api_key: state => state.user.api_key,
    }),
  }
}).$mount('#app')
