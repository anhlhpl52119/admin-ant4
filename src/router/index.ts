import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: import('@/layout/index.vue'),
      children: [
        {
          path: '/',
          component: import('@/views/home.vue'),
        },
        {
          path: '/dev',
          component: import('@/views/dev.vue'),
        },
      ],
    },
    {
      path: '/dev',
      name: 'dev',
      component: import('@/views/dev.vue'),
    },
  ],
});

export default router;
