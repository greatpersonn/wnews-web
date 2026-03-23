import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

const { publicVars } = loadEnv({ prefixes: ['PUBLIC_'] });

export default defineConfig({
  source: {
    define: publicVars,
  },
  plugins: [pluginReact(), pluginSass(), pluginSvgr()],
  html: {
    title: 'Weazel News | Головне медіа штату UGTA',
    favicon: './src/assets/logo.ico',
    meta: {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0',
      description: 'Найактуальніші новини, репортажі та ексклюзивні події штату UGTA. Будь в курсі всього, що відбувається у світі криміналу, політики та шоу-бізнесу.',
      keywords: 'Weazel News, UGTA, новини штату, GTA RP новини, репортажі UGTA, події штату',
      author: 'beloglazikov',

      // Security 
      'http-equiv': 'X-UA-Compatible', 
      content: 'IE=edge',
      'format-detection': 'telephone=no',

      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',

      'og:title': 'Weazel News — Твоє вікно в події UGTA',
      'og:description': 'Читай свіжі новини, дивись гарячі репортажі та дізнавайся про головні події штату першим!',
      'og:type': 'website',
      'og:image': './src/assets/og-preview.png',

      'twitter:card': 'summary_large_image',
      'twitter:title': 'Weazel News | UGTA',
      'twitter:description': 'Всі новини штату в одному місці. Не пропусти важливе!'
    }
  },
  output: {
    assetPrefix: '/wnews-web/',
  }
});