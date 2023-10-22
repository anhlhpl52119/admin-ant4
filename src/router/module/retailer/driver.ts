import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';

const routes: CustomRoute[] = [
  {
    path: 'driver',
    name: ERouteName.DRIVER,
    component: PageContent,
    redirect: '/driver/driver-management',
    meta: {
      hiddenInMenu: false,
      title: 'Tài xế',
      icon: 'i-healthicons:truck-driver',
    },
    children: [
      {
        path: 'driver-management',
        name: ERouteName.DRIVER_MANAGEMENT,
        component: () => import('@/views/driver/driver.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Quản lý tài xế',
        },
      },
      {
        path: 'driver-group',
        name: ERouteName.DRIVER_GROUP,
        component: () => import('@/views/group-driver/group-driver.vue'),
        meta: {
          hiddenInMenu: false,
          title: 'Nhóm tài xế',
        },
      },
    ],
  },
];

export default routes;
