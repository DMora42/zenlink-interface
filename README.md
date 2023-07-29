# Zenlink Protocol Interface

This is a monorepo interface for Zenlink -- a protocol for decentralized exchange in Polkadot ecosystem.

## Documentation

- **Integration Breakdown** can be found under [docs/Integration.md](docs/Integration.md)
- **Aggregation Swap V2 Breakdown** can be found under [docs/V2AggregationSwap.md](docs/V2AggregationSwap.md)

## Getting Started

### Install

`pnpm install`

### Build

`pnpm run build`

#### Single Repository

`pnpm exec turbo run build --filter=api/app/package`

### Dev

`pnpm exec turbo run dev --filter=swap`

### Test

`pnpm run test`

#### Single Repository

`pnpm exec turbo run test --filter=api/app/package`

### Clean

`pnpm run clean`

#### Single Repository

`pnpm exec turbo run clean --filter=api/app/package`

## Packages

- `@grass-protocol/amm`
- `@grass-protocol/chain`
- `@grass-protocol/compat`
- `@grass-protocol/config`
  - `eslint`
  - `graph`
  - `nextjs`
  - `polkadot`
  - `router`
  - `typescript`
  - `wagmi`
- `@grass-protocol/currency`
- `@grass-protocol/format`
- `@grass-protocol/graph-client`
- `@grass-protocol/hooks`
- `@grass-protocol/locales`
- `@grass-protocol/math`
- `@grass-protocol/parachains-impl`
  - `bifrost`
- `@grass-protocol/polkadot`
- `@grass-protocol/redux`
  - `localstorage`
  - `token-lists`
- `@grass-protocol/shared`
- `@grass-protocol/smart-router`
- `@grass-protocol/token-lists`
- `@grass-protocol/ui`
- `@grass-protocol/wagmi`

## In Planning

## License

[LGPL](/LICENSE) License

<br />

<a href="https://vercel.com/zenlink-interface">
  <img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" alt="Powered by Vercel" height="35">
</a>
