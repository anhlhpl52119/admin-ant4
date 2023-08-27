import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';
import { ERole } from '@/enums/common.enum';

const routes: CustomRoute[] = [{
  path: 'user',
  name: ERouteName.PAGE3,
  component: PageContent,
  redirect: '/user/feat1',
  meta: {
    hiddenInMenu: false,
  },
  children: [
    {
      path: 'feat1',
      name: ERouteName.PAGE4,
      component: () => import('@/views/home.vue'),
      meta: {
        hiddenInMenu: false,
        permit: [ERole.GUEST],
      },
    },
    {
      path: 'feat2',
      name: ERouteName.PAGE5,
      component: () => import('@/views/dev.vue'),
      meta: {
        hiddenInMenu: false,
      },
    },
  ],
}];

export default routes;
