import defaultNextConfig from '@grass-protocol/nextjs-config'

// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  ...defaultNextConfig,
  basePath: '/referrals',
  transpilePackages: [
    '@grass-protocol/redux-localstorage',
    '@grass-protocol/wagmi',
    '@grass-protocol/polkadot',
    '@grass-protocol/parachains-bifrost',
    '@grass-protocol/compat',
    '@grass-protocol/shared',
    '@grass-protocol/ui',
  ],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/referrals',
        permanent: true,
        basePath: false,
      },
    ]
  },
}

export default nextConfig
