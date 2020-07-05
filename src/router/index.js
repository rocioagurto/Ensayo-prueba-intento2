import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  
  {
    path: '/course/:name',
    name: 'course',
    component: () => import(/* webpackChunkName: "singlecourse" */ '../views/Course.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    alias: '/crear-curso',
    component: () => import(/* webpackChunkName: "agregar" */ '../views/Admin.vue'),
    meta: {
      login: true
    }
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some(route => route.meta.login);

  if(!user && authRequired){
    next('/home')
  } else{
    next();
  }
})
export default router
