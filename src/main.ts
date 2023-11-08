import { createApp } from 'vue';

// import dayjs from 'dayjs';
import App from './App.vue';
import * as plugins from '@/plugins';
import { setupRouter } from '@/router';

// import 'dayjs//locale/vi';

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
