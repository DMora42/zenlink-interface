import type { Pair } from '@grass-protocol/amm'
import type { ParachainId } from '@grass-protocol/chain'
import { usePairTotalSupply as useWagmiPairTotalSupply } from '@grass-protocol/wagmi'
import { usePairTotalSupply as useBifrostPairTotalSupply } from '@grass-protocol/parachains-bifrost'
import { useMemo } from 'react'
import { isEvmNetwork, isSubstrateNetwork } from '../config'

export const usePairTotalSupply = (pair: Pair | undefined | null, chainId: ParachainId) => {
  const wagmiPairTotalSupply = useWagmiPairTotalSupply(pair, chainId)
  const bifrostPairTotalSupply = useBifrostPairTotalSupply(pair, chainId, isSubstrateNetwork(chainId))

  return useMemo(() => {
    if (isEvmNetwork(chainId))
      return wagmiPairTotalSupply
    return bifrostPairTotalSupply
  }, [bifrostPairTotalSupply, chainId, wagmiPairTotalSupply])
}
