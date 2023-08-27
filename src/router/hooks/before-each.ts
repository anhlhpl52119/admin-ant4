import { type Router } from 'vue-router';

// import NProgress from 'nprogress';

// import { useUserAuth } from '@/stores/auth';
// import { DefaultRoutes } from '@/enums/route-name';

export const beforeEach = (router: Router) => {
//   router.beforeEach(async (to, _, next) => {
//     // NProgress.start();
//     const authStore = useUserAuth();
//     const token = localStore.get(EStorage.ACCESS_TOKEN);
//     if (token) {
//       try {
//         await authStore.afterLogin();
//       }
//       catch (error) {
//         authStore.resetToken();
//       }
//       const hasRoute = router.hasRoute(to.name!);
//       if (to.name === DefaultRoutes.Default) {
//         next({ path: '/' });
//       }
//       else {
//         if (!hasRoute) {
//           next({ ...to, replace: true });
//         }
//         else {
//           next();
//         }
//       }
//     }
//     else {
//       const hasRoute = router.hasRoute(to.name!);
//       if (hasRoute) {
//         next();
//       }
//       else {
//         next({ name: DefaultRoutes.Default, replace: true });
//       }
//     }
//   });
  router.beforeEach(async (to, _, next) => {
    console.log('before each: ', to);
    next();
  });
};
