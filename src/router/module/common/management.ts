import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';

const routes: CustomRoute[] = [
  {
    path: 'management',
    name: ERouteName.MANAGEMENT,
    component: PageContent,
    redirect: '/management/page1',
    meta: {
      title: 'Management',
      hiddenInMenu: false,
      icon: 'i-carbon:gui-management',
    },
    children: [
      {
        path: 'page1',
        name: ERouteName.MANAGEMENT_PAGE1,
        component: () => import('@/views/demo/demo-button.vue'),
        meta: {
          title: 'Management Menu 1',
          hiddenInMenu: false,
        },
      },
      {
        path: 'page2',
        name: ERouteName.MANAGEMENT_PAGE2,
        component: () => import('@/views/demo/dev.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Management Menu 2',
        },
      },
    ],
  },
];

export default routes;
