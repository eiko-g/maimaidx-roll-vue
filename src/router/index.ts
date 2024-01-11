import { createRouter, createWebHashHistory } from 'vue-router';
import { useSonglistStore } from '@/stores/songlist';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: {
        name: 'loading'
      }
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('../views/LoadingView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/roll',
      component: () => import('../views/RollView.vue'),
      redirect: { name: 'roll' },
      children: [
        {
          path: '',
          name: 'roll',
          component: () => import('../views/Roll/RollIndexView.vue')
        },
        {
          path: 'setting',
          name: 'rollSetting',
          component: () => import('../views/Roll/RollSettingView.vue')
        }
      ]
    },
    {
      path: '/list/',
      name: 'list',
      component: () => import('../views/List/ListView.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/Detail/DetailView.vue')
    },
    {
      path: '/custom',
      component: () => import('../views/CustomView.vue'),
      redirect: { name: 'custom' },
      children: [
        {
          path: '',
          name: 'custom',
          component: () => import('../views/Custom/CustomIndexView.vue')
        },
        {
          path: 'add',
          name: 'custom-add',
          component: () => import('../views/Custom/CustomAddView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/ErrorView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'loading' && !checkSonglist()) {
    console.log('路由守卫：没载入到歌单');
    next({ name: 'loading' });
  } else {
    next();
  }
});

function checkSonglist() {
  const store = useSonglistStore();
  if (store.originSonglist.length > 0) {
    return true;
  } else {
    return false;
  }
}

export default router;
