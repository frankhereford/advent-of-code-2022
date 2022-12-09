import packageJson from './package.json' assert { type: 'json' }

// function which returns the minor version of the current package
const getMinorVersion = () => {
  const version = packageJson.version
  const minorVersion = version.split('.').slice(1, 2).join('.')
  console.log(minorVersion)
  return parseInt(minorVersion)
}

const defaultDay = getMinorVersion(packageJson.version)

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
  async redirects () {
    return [
      {
        source: '/',
        destination: `/${defaultDay}`,
        permanent: false
      }
    ]
  },
  webpack (config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      fs: 'memfs'
    }
    return config
  }
}
export default config
