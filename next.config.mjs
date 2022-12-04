import { defaultDay } from 'src/pages/[index]'

// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

/** @type {import("next").NextConfig} */
const config = {
  // only because in development, components are mounted twice per normal course
  // this is annoying when developing a solution on the "terminal"
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  async redirects () {
    return [
      {
        source: '/',
        destination: `/${defaultDay}`,
        permanent: false
      }
    ]
  }
}
export default config
