import type { App } from 'vue';
import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/reset.css';
import '@/assets/styles/base.less';

// setup
export const setupAntdv = (app: App) => {
  app.use(Antd);
};
