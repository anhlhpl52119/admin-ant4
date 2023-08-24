import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import * as plugins from '@/plugins';

const app = createApp(App);

const setupPlugin = () => {
  plugins.setupAssets();
  plugins.setupPinia(app);
  plugins.setupAntdv(app);
};

const setupApp = async () => {
  app.use(router);
  await router.isReady();
};

setupPlugin();
await setupApp();
app.mount('#app');
