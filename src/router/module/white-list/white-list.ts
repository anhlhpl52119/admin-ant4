import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import App from '@/App.vue';

export const whiteListRoutes: CustomRoute[] = [
  {
    path: '/',
    name: ERouteName.MAIN_LAYOUT,
    component: App,
    redirect: '/sign-in',
    meta: {
      hiddenInMenu: true,
      title: 'White List',
    },
    children: [
      {
        path: '/sign-in',
        name: ERouteName.LOGIN,
        // component: () => import('@/pages/login.vue'),
        component: () => import('@/pages/test/index.vue'),
        meta: {
          title: 'Login',
          hiddenInMenu: true,
        },
      },
    ],
  },
];
