import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';
import { ERole } from '@/enums/common.enum';

const routes: CustomRoute[] = [
  {
    path: 'transaction',
    name: ERouteName.TRANSACTION_HISTORY,
    component: PageContent,
    redirect: '/transaction/transaction-management',
    meta: {
      hiddenInMenu: false,
      title: 'Giao dịch',
      icon: 'i-svg:transaction',
      permit: [ERole.RETAILER_MANAGER],
    },
    children: [
      {
        path: 'transaction-management',
        name: ERouteName.TRANSACTION_HISTORY_MANAGEMENT,
        component: () => import('@/views/retailer-management/transaction/transaction-management.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Quản lý giao dịch',
          permit: [ERole.RETAILER_MANAGER],
        },
      },
      // {
      //   path: 'driver-group',
      //   name: ERouteName.TRANSACTION_HISTORY_de,
      //   component: () => import('@/views/retailer-management/group-driver/group-driver-management.vue'),
      //   meta: {
      //     hiddenInMenu: false,
      //     title: 'Nhóm tài xế',
      //     permit: [ERole.RETAILER_MANAGER],
      //   },
      // },
    ],
  },
];

export default routes;
