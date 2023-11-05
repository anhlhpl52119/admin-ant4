import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/retailer-layout/page-content/index.vue';

const routes: CustomRoute[] = [
  {
    path: 'branch',
    name: ERouteName.BRANCH,
    component: () => PageContent,
    redirect: '/branch/branch-management',
    meta: {
      hiddenInMenu: false,
      title: 'Chi nhánh',
      icon: 'i-svg:store',
    },
    children: [
      {
        path: 'branch-management',
        name: ERouteName.BRANCH_MANAGEMENT,
        component: () => import('@/views/retailer/branch/branch-management.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Quản lý chi nhánh',
        },
      },
    ],
  },
];

export default routes;
