import defaultNextConfig from '@grass-protocol/nextjs-config'

// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  ...defaultNextConfig,
  basePath: '/pool',
  transpilePackages: [
    '@grass-protocol/redux-token-lists',
    '@grass-protocol/redux-localstorage',
    '@grass-protocol/wagmi',
    '@grass-protocol/polkadot',
    '@grass-protocol/parachains-bifrost',
    '@grass-protocol/compat',
    '@grass-protocol/shared',
    '@grass-protocol/ui',
    '@grass-protocol/graph-client',
  ],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pool',
        permanent: true,
        basePath: false,
      },
    ]
  },
}

export default nextConfig
