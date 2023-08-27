import type { CustomRoute } from './typing';
import { ERole } from '@/enums/common.enum';
import staticRoutes from '@/router/module';
import router, { routes } from '@/router';
import { ERouteName } from '@/enums/router.enum';

const userRole = ERole.ADMIN;
const filterRoute = (arr: CustomRoute[]) => {
  const result: CustomRoute[] = [];
  arr.forEach((i) => {
    if (!i.meta.permit || i.meta.permit.length === 0) {
      if (!i.children || i.children.length === 0) {
        result.push(i);
        return;
      }
      i.children = filterRoute(i.children);
      result.push(i);
      return;
    }

    if (!i.meta.permit.includes(userRole)) {
      return;
    }

    if (!i.children || i.children.length === 0) {
      result.push(i);
      return;
    }

    i.children = filterRoute(i.children);
    result.push(i);
  });
  return result;
};
export const dynamicRouterGenerator = (role: ERole) => {
  try {
    const baseLayout = routes.find(item => item.name === ERouteName.PAGE1)!;
    const fillteredRoleRoutes = filterRoute(staticRoutes);
    const menus = [...fillteredRoleRoutes]; // TODO: add error module path
    baseLayout.children = menus;
    // const removeRoute = router.addRoute(layout);
    // const filterRoutes = router.getRoutes().filter(i => i);
    router.addRoute(baseLayout);
    // console.log('object', router.getRoutes());
    return Promise.resolve({
      menus,
      routes: baseLayout.children,
    });
  }
  catch (error) {
    return Promise.reject(error);
  }
};
const removeRoute = (name: ERouteName[]) => {
  name.forEach((i) => {
    if (!router.hasRoute(i)) {
      return;
    }
    router.removeRoute(i);
  });
};
