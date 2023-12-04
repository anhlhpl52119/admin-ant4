import { createRouter, createWebHistory } from 'vue-router';
import type { App } from 'vue';
import type { CustomRoute } from './typing';
import { afterEach, beforeEach } from './hooks';
import { whiteListRoutes } from './module/white-list/white-list';
import { ERouteName } from '@/enums/router.enum';
import AppView from '@/App.vue';

export const routes: CustomRoute[] = [
  {
    path: '/',
    name: ERouteName.MAIN_LAYOUT,
    component: AppView,
    meta: {
      hiddenInMenu: false,
      title: 'Home',
      permit: [],
    },
    children: [],
  },
  ...whiteListRoutes,

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export async function setupRouter(app: App) {
  // Init router gruard
  beforeEach(router);
  afterEach(router);

  // App setup router
  app.use(router);
  await router.isReady();
}

export default router;
