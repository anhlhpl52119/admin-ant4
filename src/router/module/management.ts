import type { CustomRoute } from '@/router/typing';
import { ERouteName } from '@/enums/router.enum';
import PageContent from '@/layout/page-content/index.vue';

const routes: CustomRoute[] = [{
  path: 'management',
  name: ERouteName.MANAGEMENT,
  component: PageContent,
  redirect: '/management/page1',
  meta: {
    hiddenInMenu: false,
  },
  children: [
    {
      path: 'page1',
      name: ERouteName.MANAGEMENT_PAGE1,
      component: () => import('@/views/home.vue'),
      meta: {
        hiddenInMenu: false,
      },
    },
    {
      path: 'page2',
      name: ERouteName.MANAGEMENT_PAGE2,
      component: () => import('@/views/dev.vue'),
      meta: {
        hiddenInMenu: false,
      },
    },
  ],
}];

export default routes;
