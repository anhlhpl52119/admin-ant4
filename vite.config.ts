import { URL, fileURLToPath } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import type { ConfigEnv, UserConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import UnoCSS from 'unocss/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// eslint-disable-next-line n/prefer-global/process
const CWD = process.cwd();

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const { VITE_API_DESTINATION, VITE_API_SIGNATURE_PREFIX } = loadEnv(mode, CWD);

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
        dirs: [
          './src/composable/core',
          './src/stores',
        ],
        imports: ['vue', 'vue-router', 'pinia'],
        vueTemplate: true,
      }),
      UnoCSS(),
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
        [VITE_API_SIGNATURE_PREFIX]: {
          target: VITE_API_DESTINATION,
          changeOrigin: true,
        },
        '/login': {
          target: VITE_API_DESTINATION,
          changeOrigin: true,
        },
        '/logout': {
          target: VITE_API_DESTINATION,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 5000,
    },
    build: {
      target: 'es2017',
      minify: 'esbuild',
      cssTarget: 'chrome79',
      chunkSizeWarningLimit: 2000,
    },
    optimizeDeps: {
      include: [
        'lodash-es',
        'ant-design-vue/es/locale/vi_VN',
      ],
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
