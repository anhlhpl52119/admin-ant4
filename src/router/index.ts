import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('@/views/home.vue'),
    },
    {
      path: '/dev',
      name: 'dev',
      component: import('@/views/dev.vue'),
    },
  ],
});

export default router;
