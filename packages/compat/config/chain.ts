import { ParachainId } from '@grass-protocol/chain'

export {
  EVM_NETWORKS,
  isEvmNetwork,
  isSubstrateNetwork,
  SUBSTRATE_NETWORKS,
} from '@grass-protocol/chain'

export const AMM_ENABLED_NETWORKS = [
  ParachainId.ASTAR,
  ParachainId.MOONRIVER,
  ParachainId.MOONBEAM,
  ParachainId.BIFROST_KUSAMA,
  ParachainId.BIFROST_POLKADOT,
]

export const SUPPORTED_CHAIN_IDS = Array.from(new Set([...AMM_ENABLED_NETWORKS]))
