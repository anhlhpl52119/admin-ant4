import { createRouter, createWebHistory } from 'vue-router';
import type { App } from 'vue';
import type { CustomRoute } from './typing';
import { afterEach, beforeEach } from './hooks';
import { dynamicRouterGenerator } from './router-factory';
import MainLayout from '@/layout/index.vue';
import { ERouteName } from '@/enums/router.enum';
import { ERole } from '@/enums/common.enum';

export const routes: CustomRoute[] = [{
  path: '/',
  name: ERouteName.PAGE1,
  component: MainLayout,
  redirect: '/user/feat1',
  meta: {
    hiddenInMenu: false,
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
  // Init Router goard
  beforeEach(router);
  afterEach(router);
  // App setup
  app.use(router);
  await router.isReady();
}
export default router;
