import { createRouter, createWebHashHistory } from 'vue-router'
import Roll from '../views/Roll.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {
      name: 'Roll'
    }
  },
  {
    path: '/roll',
    name: 'Roll',
    component: Roll
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  // {
  //   path: '*',
  //   name: 'Error',
  //   component: () => import('../views/Error.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
