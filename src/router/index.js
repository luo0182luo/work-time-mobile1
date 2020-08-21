import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/manhour',
    children: [{
      path: '/manhour',
      name: 'manhour',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/ManHour.vue')
    },
    {
      path: '/manhourcheck',
      name: 'manhourcheck',
      component: () => import('../views/ManHourCheck.vue')
    },
    {
      path: '/taskslist/:type',
      name: 'taskslist',
      component: () => import('../views/TasksList.vue')
    }]
  },

]

const router = new VueRouter({
  routes
})

export default router
