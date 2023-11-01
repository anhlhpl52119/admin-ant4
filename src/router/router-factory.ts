import type { CustomRoute } from './typing';
import router from '@/router';
import { commonRoutes } from '@/router/module/common';
import { ERouteName } from '@/enums/router.enum';
import { DEFAULT_ROLE_ROUTE } from '@/constants/common.constant';

const filterRoutesByRole = (routes: CustomRoute[], role: API.UserRole) => {
  const result: CustomRoute[] = [];

  routes.forEach((route) => {
    const perms = route.meta.permit;
    const childRoutes = route.children;

    // no permit roles specify for current routes
    if (!perms || perms.length === 0 || perms.includes(role)) {
      if (childRoutes && childRoutes.length > 0) {
        // deep filter
        route.children = filterRoutesByRole(route.children, role);
      }

      result.push(route);
    }
  });

  return result;
};

export const dynamicRouterGenerator = async (userRole: API.UserRole) => {
  try {
    const layout = commonRoutes.find(item => item.name === ERouteName.MAIN_LAYOUT)!;
    const userRoutes = filterRoutesByRole(layout.children || [], userRole);
    layout.children = userRoutes;
    layout.path = '/';
    layout.redirect = DEFAULT_ROLE_ROUTE[userRole];
    router.addRoute(layout);

    return Promise.resolve({
      routes: layout.children,
    });
  }
  catch (error) {
    return Promise.reject(new Error('Router error'));
  }
};
