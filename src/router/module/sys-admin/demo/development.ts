import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import { ERole } from '@/enums/common.enum';

const routes: CustomRoute[] = [
  {
    path: '/dev',
    name: ERouteName.DEV,
    redirect: '/dev/page1',
    component: () => import('@/layout/sys-layout/page-content/index.vue'),
    meta: {
      title: 'Test & Dev',
      hiddenInMenu: false,
      permit: [ERole.ADMIN],
      icon: 'i-game-icons:soap-experiment',
    },
    children: [
      {
        path: 'page1',
        name: ERouteName.DEV_1,
        meta: {
          title: 'Development 1',
          hiddenInMenu: false,
        },
        component: () => import('@/views/sys-admin/demo/dev.vue'),
      },
    ],
  },
];

export default routes;
