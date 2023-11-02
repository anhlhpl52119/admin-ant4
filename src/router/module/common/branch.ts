import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';
import { ERole } from '@/enums/common.enum';

const routes: CustomRoute[] = [
  {
    path: 'branch',
    name: ERouteName.RETAILER_BRANCH,
    component: PageContent,
    redirect: '/branch/management',
    meta: {
      hiddenInMenu: false,
      title: 'Chi nhánh',
      icon: 'i-svg:store',
      permit: [ERole.RETAILER_MANAGER],
    },
    children: [
      {
        path: 'management',
        name: ERouteName.RETAILER_BRANCH_MANAGEMENT,
        component: () => import('@/views/retailer/branch/branch-management.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Quản lý chi nhánh',
        },
      },
      {
        path: ':id/details',
        name: ERouteName.RETAILER_BRANCH_DETAIL,
        component: () => import('@/views/demo/demo-button.vue'),
        meta: {
          hiddenInMenu: true,
          title: 'Branch management',
        },
        props: route => ({ branchId: route?.params?.id?.toString() || '' }),
      },
    ],
  },
];

export default routes;
