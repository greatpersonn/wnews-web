import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({
  plugins: [pluginReact(), pluginSass(), pluginSvgr()],
  html: {
    title: 'Weazel News | UGTA',
    favicon: '',
    meta: {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0',
      description: 'Something description',
      keywords: '',
      author: 'beloglazikov',

      // Security 
      'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
      'format-detection': 'telephone=no',

      // Apple 
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',

      'og:title': '',
      'og:description': '',

      'twitter:card': 'summary_large_image',
      'twitter:title': '',
      'twitter:description': ''
    }
  },
  output: {
    assetPrefix: '/wnews/',
  }
});