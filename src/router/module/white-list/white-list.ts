import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import App from '@/App.vue';

export const whiteListRoutes: CustomRoute[] = [
  {
    path: '/sign-in',
    name: ERouteName.LOGIN,
    component: () => import('@/views/common/login.vue'),
    meta: {
      title: 'Đăng nhập',
      hiddenInMenu: true,
    },
  },
];
