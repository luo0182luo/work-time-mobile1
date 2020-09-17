import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import error404 from '@/views/error404'
import error403 from '@/views/error403'
import noPermission from '@/views/noPermission'


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
  {
    path: '/404',
    name: '404',
    component:error404,
    meta:{title:'404',keepAlive:true}
  },
  {
    path: '/403',
    name: '403',
    component:error403,
    meta:{title:'403',keepAlive:true}
  },
  {
    path: '/noPermission',
    name: 'noPermission',
    component:noPermission,
    meta:{title:'無權限',keepAlive:true}
  },
  {
    path: '*',
    redirect: '/404'
  }
  
]

const router = new VueRouter({
  routes
})

export default router
