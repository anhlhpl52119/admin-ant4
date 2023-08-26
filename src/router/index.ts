import { type RouteComponent, createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layout/index.vue';

interface CustomRoute {
  path: string
  name?: string
  component: RouteComponent
  children?: CustomRoute[]
  meta?: {
    icon?: string
    title?: string
    permitRoles?: any[]
  }
}

const routes2: CustomRoute[] = [{
  path: '/',
  component: MainLayout,
  children: [
    {
      path: '/',
      component: () => import('@/views/home.vue'),
    },
    {
      path: '/dev',
      component: () => import('@/views/dev.vue'),
    },
  ],
}];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes2,
  ],
});

export default router;
