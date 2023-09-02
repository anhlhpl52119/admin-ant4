import type { CustomRoute } from './typing';
import type { ERole } from '@/enums/common.enum';
import staticRoutes from '@/router/module';
import router, { routes } from '@/router';
import { ERouteName } from '@/enums/router.enum';

const filterRoute = (arr: CustomRoute[], userRole: ERole) => {
  const result: CustomRoute[] = [];
  arr.forEach((i) => {
    if (!i.meta.permit || i.meta.permit.length === 0) {
      if (!i.children || i.children.length === 0) {
        result.push(i);

        return;
      }
      i.children = filterRoute(i.children, userRole);
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

    i.children = filterRoute(i.children, userRole);
    result.push(i);
  });

  return result;
};

export const dynamicRouterGenerator = async (userRole: ERole) => {
  try {
    const baseLayout = routes.find(item => item.name === ERouteName.MAIN_LAYOUT)!;
    const userRoutes = filterRoute(staticRoutes, userRole);
    const menus = [...userRoutes]; // TODO: add error module path
    baseLayout.children = menus;
    router.addRoute(baseLayout);

    return Promise.resolve({
      menus,
      routes: baseLayout.children,
    });
  }
  catch (error) {
    return Promise.reject(error);
  }
};
