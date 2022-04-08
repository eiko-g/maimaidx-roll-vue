import { createRouter, createWebHashHistory } from 'vue-router'
import Roll from '../views/Roll.vue'
import Loading from '../views/Loading.vue'
import store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {
      name: 'Loading'
    }
  },
  {
    path: '/loading',
    name: 'Loading',
    component: Loading
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
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: () => import('../views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Loading' && !checkSonglist()) {
    console.log('路由守卫：没载入到歌单')
    next({ name: 'Loading' })
  } else {
    next()
  }
})

function checkSonglist() {
  let songlist = store.getters.getOriginalSongList;
  return !!songlist.data;
}

export default router
