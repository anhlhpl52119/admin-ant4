import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';
import { ERole } from '@/enums/common.enum';

const routes: CustomRoute[] = [
  {
    path: 'branch',
    name: ERouteName.BRANCH,
    component: PageContent,
    redirect: '/branch/branch-management',
    meta: {
      hiddenInMenu: false,
      title: 'Chi nhánh',
      icon: 'i-svg:store',
      permit: [ERole.RETAILER_MANAGER],
    },
    children: [
      {
        path: 'branch-management',
        name: ERouteName.BRANCH_MANAGEMENT,
        component: () => import('@/views/branch/branch.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Quản lý chi nhánh',
          permit: [ERole.RETAILER_MANAGER],
        },
      },
    ],
  },
];

export default routes;
