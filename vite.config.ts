import { URL, fileURLToPath } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import type { ConfigEnv, UserConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import UnoCSS from 'unocss/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// const url = import.meta.env.VITE_BASE_API_URL;
// const auth = import.meta.env.VITE_API_AUTH_PREFIX;
// const base = import.meta.env.VITE_API_VERSION_PREFIX;
// TODO: add from .env
const url = 'https://dcms-dev.takeit.vn';
const auth = '/login';
const logout = '/logout';
const base = '/api/v1/';

// eslint-disable-next-line n/prefer-global/process
const CWD = process.cwd();
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const { VITE_APP_TITLE } = loadEnv(mode, CWD);

  return {
    plugins: [
      Vue(),
      Components({
        dts: './auto/components.d.ts',
        include: [/\.vue$/, /\.vue\?vue/],
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
      }),
      AutoImport({
        dts: './auto/auto-imports.d.ts',
        dirs: ['./src/composable/core'],
        imports: ['vue', 'vue-router', 'pinia'],
        vueTemplate: true,
      }),
      UnoCSS({
        presets: [],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@import "./src/assets/styles/varr.scss";',
        },
      },
    },
    server: {
      port: 5500,
      host: true,
      proxy: {
        [base]: {
          target: url,
          changeOrigin: true,
        },
        [auth]: {
          target: url,
          changeOrigin: true,
        },
        [logout]: {
          target: url,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
