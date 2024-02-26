import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import { ERole } from '@/enums/common.enum';

const routes: CustomRoute[] = [
  {
    path: 'transaction',
    name: ERouteName.TRANSACTION_HISTORY,
    component: () => import('@/layout/retailer-layout/page-content/index.vue'),
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
        component: () => import('@/views/retailer/transaction/transaction-management.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Quản lý giao dịch',
          permit: [ERole.RETAILER_MANAGER],
        },
      },
      // {
      //   path: 'driver-group',
      //   name: ERouteName.TRANSACTION_HISTORY_de,
      //   component: () => import('@/views/retailer/group-driver/group-driver-management.vue'),
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
