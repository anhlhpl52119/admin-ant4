import type { CustomRoute } from '../typing';
import { ERouteName } from '@/enums/router.enum';
import App from '@/App.vue';

export const whiteListRoutes: CustomRoute[] = [{
  path: '/',
  name: ERouteName.WHITE_LIST,
  component: App,
  redirect: '/alogin',
  meta: {
    hiddenInMenu: true,
    title: 'White List',
  },
  children: [
    {
      path: '/alogin',
      name: ERouteName.LOGIN,
      component: () => import('@/pages/login.vue'),
      meta: {
        title: 'Login',
        hiddenInMenu: true,
      },
    },
  ],
}];
