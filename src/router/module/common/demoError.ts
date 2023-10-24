import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';

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
      permit: ['sys'],
    },
    children: [
      {
        path: 'page1',
        name: ERouteName.DASHBOARD_PAGE1,
        component: () => import('@/views/demo/demo-button.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Demo page',
        },
      },
      {
        path: 'demo-component',
        name: ERouteName.DEMO,
        component: PageContent,
        meta: {
          hiddenInMenu: false,
          title: 'Demo Nested Menu',
        },
        children: [
          {
            path: 'demo-1',
            name: ERouteName.DEMO_PAGE1,
            component: () => import('@/views/demo/multiples-langs.vue'),
            meta: {
              hiddenInMenu: false,
              title: 'Menu level 2',
            },
          },
        ],
      },
    ],
  },
];

export default routes;
