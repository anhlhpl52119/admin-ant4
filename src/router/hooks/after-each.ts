import { type Router } from 'vue-router';

// import NProgress from 'nprogress';

// https://www.npmjs.com/package/nprogress

export const afterEach = (router: Router) => {
  router.afterEach(() => {
    console.log('after');
    // NProgress.done(); // End progress bar
  });
};
