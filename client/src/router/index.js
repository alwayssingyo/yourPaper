import { createWebHashHistory, createRouter } from 'vue-router';
import MainPage from '../pages/Main.vue';
import Test from '../pages/Test.vue';
import ViewPage from '../pages/View.vue';
import WritePage from '../pages/Write.vue';
import ErrorPage from '../pages/Error.vue';

const routes = [
  {
    path: '/',
    redirect: '/main',
    meta: {
      title: 'YOUR Paper'
    }
  },
  {
    path: '/main',
    component: MainPage,
    meta: {
      title: 'YOUR Paper'
    }
  },
  {
    path: '/test',
    component: Test,
    meta: {
      title: 'YOUR Paper'
    }
  },
  {
    path: '/view/:id',
    component: ViewPage,
    meta: {
      title: 'YOUR Paper'
    }
  },
  {
    path: '/write/:id',
    component: WritePage,
    meta: {
      title: 'YOUR Paper'
    }
  },
  {
    path: '/error',
    component: ErrorPage,
    meta: {
      title: 'ERROR | YOUR Paper'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error',
    meta: {
      title: 'ERROR | YOUR Paper'
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 라우트별 타이틀 변경
router.beforeEach((to, from) => {
  const title = to.meta.title === undefined ? 'YOUR Paper' : to.meta.title;
  document.title = title;
});

export default router;