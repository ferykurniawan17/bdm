// eslint-disable-next-line no-undef
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants';

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
// eslint-disable-next-line no-undef
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  // eslint-disable-next-line no-undef
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  // eslint-disable-next-line no-undef
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  const env = {
    API: (() => {
      if (isProd) return '';
      if (isDev) return '';
      if (isStaging) return '';
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
  };

  const basePath = '';

  // next.config.js object
  return {
    env,
    basePath,
    typescript: {
      ignoreBuildErrors: false,
    },
    i18n: {
      locales: ['id', 'en'],
      defaultLocale: 'id',
      localeDetection: false,
    },
    trailingSlash: true,
  };
};
