import type { App } from 'vue';
import Antd from 'ant-design-vue';

// import 'ant-design-vue/dist/reset.css';

// setup
export const setupAntdv = (app: App) => {
  app.use(Antd);
};
