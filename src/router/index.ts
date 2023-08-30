import { createRouter, createWebHistory } from 'vue-router';
import type { App } from 'vue';
import type { CustomRoute } from './typing';
import { afterEach, beforeEach } from './hooks';
import { dynamicRouterGenerator } from './router-factory';
import MainLayout from '@/layout/index.vue';
import { ERouteName } from '@/enums/router.enum';
import { ERole } from '@/enums/common.enum';
import { DEFAULT_ROUTE_PATH } from '@/constants/common.constant';

export const routes: CustomRoute[] = [{
  path: '/',
  name: ERouteName.MAIN_LAYOUT,
  component: MainLayout,
  redirect: DEFAULT_ROUTE_PATH,
  meta: {
    hiddenInMenu: false,
    title: 'Home',
    permit: [],
  },
  children: [],
}];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export async function setupRouter(app: App) {
  dynamicRouterGenerator(ERole.ADMIN);

  // Init router gruard
  beforeEach(router);
  afterEach(router);

  // App setup router
  app.use(router);
  await router.isReady();
}
export default router;
