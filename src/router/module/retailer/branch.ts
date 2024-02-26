import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';

const routes: CustomRoute[] = [
  {
    path: 'branch',
    name: ERouteName.BRANCH,
    component: () => import('@/layout/retailer-layout/page-content/index.vue'),
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
