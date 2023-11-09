import { createApp } from 'vue';
import App from './App.vue';
import * as plugins from '@/plugins';
import { setupRouter } from '@/router';

const app = createApp(App);

const setupPlugin = () => {
  plugins.setupAssets();
  plugins.dayjsSetup();
  plugins.setupAntdv(app);
  plugins.setupPinia(app);
};

const setupApp = async () => {
  setupPlugin();
  await setupRouter(app);
  app.mount('#app');
};

setupApp();
