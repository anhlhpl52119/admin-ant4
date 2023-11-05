import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';

const routes: CustomRoute[] = [
  {
    path: '/error',
    name: ERouteName.ERROR,
    redirect: '/error/404',
    component: () => import('@/layout/sys-layout/page-content/index.vue'),
    meta: {
      title: '404',
      hiddenInMenu: true,
    },
    children: [
      {
        path: '404',
        name: ERouteName.ERROR_404,
        meta: {
          title: '404',
          hiddenInMenu: true,
        },
        component: () => import(/* webpackChunkName: "404" */ '@/views/errors/404.vue'),
      },
    ],
  },
];

export default routes;
