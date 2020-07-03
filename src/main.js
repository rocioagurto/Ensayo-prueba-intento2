import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Firebase from 'firebase'
import FirebaseConfig from '../config/firebase'


Vue.use(IconsPlugin)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Firebase.initializeApp(FirebaseConfig)

Vue.config.productionTip = false

let app= ''

Firebase.auth().onAuthStateChanged(()=>{
 if(!app){
  app = new Vue({ 
   router,
   store,
   render: h => h(App)
  }).$mount('#app')
 } 
})