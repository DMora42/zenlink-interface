import type { ParachainId } from '@grass-protocol/chain'
import { chains, isSubstrateNetwork } from '@grass-protocol/chain'
import { encodeAddress } from '@polkadot/util-crypto'

export function encodeChainAddress(address: string, chainId: ParachainId) {
  return isSubstrateNetwork(chainId) ? encodeAddress(address, chains[chainId]?.prefix) : address
}
