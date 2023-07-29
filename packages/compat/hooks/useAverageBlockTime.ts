import type { ParachainId } from '@grass-protocol/chain'
import { useAverageBlockTime as useWagmiAverageBlockTime } from '@grass-protocol/wagmi'
import { useMemo } from 'react'
import { useAverageBlockTime as useSubstrateAverageBlockTime } from '@grass-protocol/polkadot'
import { isEvmNetwork } from '../config'

export const useAverageBlockTime = (chainId: ParachainId) => {
  const wagmiBlockNumber = useWagmiAverageBlockTime(chainId)
  const substrateBlockNumber = useSubstrateAverageBlockTime(chainId)

  return useMemo(() => {
    if (isEvmNetwork(chainId))
      return wagmiBlockNumber
    return substrateBlockNumber
  }, [chainId, substrateBlockNumber, wagmiBlockNumber])
}
