import type { CSSEntries, UtilObject } from 'unocss';
import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  include: [
    // /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.ts$/,
    /\.vue$/,
    /\.vue\?vue/, // .vue
  ],
  safelist: ['bg-info', 'bg-danger', 'bg-warning', 'bg-success', 'bg-white'],
  theme: {
    colors: {
      abd: '#dcdfe5', // app border,
      primary: '#3b82f6',
      secondary: '#64748B',
      success: '#22c55e',
      info: '#3b82f6',
      warning: '#f59e0b',
      help: '#d946ef',
      danger: '#ef4444',
      plain: '#6c757d',
    },
    breakpoints: {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  shortcuts: [
    ['absolute-full', 'absolute top-0 left-0 right-0 bottom-0 w-full h-full'],
    ['absolute-tl', 'absolute top-0 left-0'],
    ['absolute-tr', 'absolute top-0 right-0'],
    ['absolute-bl', 'absolute bottom-0 left-0'],
    ['absolute-br', 'absolute bottom-0 right-0'],
    ['absolute-center', 'absolute top-1/2 left-1/2 translate--1/2'],
    ['absolute-t-center', 'absolute top-0 left-1/2 translate-x--1/2'],
    ['absolute-r-center', 'absolute right-0 top-1/2 translate-y--1/2'],
    ['absolute-b-center', 'absolute bottom-0 left-1/2 translate-x--1/2'],
    ['absolute-l-center', 'absolute left-0 top-1/2 translate-y--1/2'],
    ['fixed-full', 'fixed top-0 left-0 right-0 bottom-0 w-screen h-screen'],
    ['fixed-tl', 'fixed top-0 left-0'],
    ['fixed-center', 'fixed top-1/2 left-1/2 translate--1/2'],
    ['flex-center', 'flex items-center justify-center'],
    ['grid-center', 'grid items-center justify-items-center'],
  ],
  postprocess: (util: UtilObject) => {
    // 1 => 0.1rem (ex: p-1)
    {
      const remRE = /(-?[\.\d]+)rem/g;

      util.entries.forEach((i: [string, string | number | undefined]) => {
        const value = i[1];

        if (value && typeof value === 'string' && remRE.test(value)) {
          i[1] = value.replace(remRE, (_: string, p1: string) => `${(+p1 * 4) / 10}rem`);
        }
      });
    }

    // 1rpx => 1rem (ex: p-1rpx)
    {
      const rpxRE = /(-?[\.\d]+)rpx/g;

      util.entries.forEach((i: [string, string | number | undefined]) => {
        const value = i[1];

        if (value && typeof value === 'string' && rpxRE.test(value)) {
          i[1] = value.replace(rpxRE, (_: string, p1: string) => `${p1}rem`);
        }
      });
    }
  },
  variants: [
    // i_rule to make it !important (ex: i_p-1)
    (matcher: string) => {
      if (!matcher.startsWith('i_')) {
        return matcher;
      }

      return {
        matcher: matcher.slice(2),
        body: (body: CSSEntries) => {
          body.forEach((v: [string, string | number | undefined]) => {
            if (v[1]) {
              v[1] += ' !important';
            }
          });

          return body;
        },
      };
    },
  ],
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        // custom: FileSystemIconLoader('./assets/svg', (svg: string) => svg),
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
      warn: true,
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
