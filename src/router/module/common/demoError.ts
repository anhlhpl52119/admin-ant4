import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';
import { ERole } from '@/enums/common.enum';

const routes: CustomRoute[] = [
  {
    path: 'demo',
    name: ERouteName.DEMO_ERROR,
    component: PageContent,
    redirect: '/demo/error-500',
    meta: {
      hiddenInMenu: false,
      title: 'Demo',
      icon: 'i-game-icons:soap-experiment',
      permit: [ERole.ADMIN],
    },
    children: [
      {
        path: 'error-500',
        name: ERouteName.ERROR_500,
        component: () => import('@/views/errors/500.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Error 500',
        },
      },
      {
        path: 'error-404',
        name: ERouteName.DEMO_404,
        component: () => import('@/views/errors/404.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Error 404',
        },
      },
      {
        path: 'error-403',
        name: ERouteName.ERROR_403,
        component: () => import('@/views/errors/403.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Error 304',
        },
      },
      {
        path: 'demo-component',
        name: ERouteName.DEMO,
        component: PageContent,
        meta: {
          hiddenInMenu: false,
          title: 'Demo Component',
        },
        children: [
          {
            path: 'demo-1',
            name: ERouteName.DEMO_PAGE1,
            component: () => import('@/views/demo/multiples-langs.vue'),
            meta: {
              hiddenInMenu: false,
              title: 'Multiple languages',
            },
          },
        ],
      },
    ],
  },
];

export default routes;
