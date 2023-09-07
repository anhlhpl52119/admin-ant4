import { URL, fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import UnoCSS from 'unocss/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { presetAttributify, presetIcons, presetUno } from 'unocss';

// const url = import.meta.env.VITE_BASE_API_URL;
// const auth = import.meta.env.VITE_API_AUTH_PREFIX;
// const base = import.meta.env.VITE_API_VERSION_PREFIX;
// TODO: add from .env
const url = 'https://dcms-dev.takeit.vn';
const auth = '/login';
const base = '/api/v1/';

export default defineConfig({
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
      imports: [
        'vue', 'vue-router',
      ],
      vueTemplate: true,
    }),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
      ],
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
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
