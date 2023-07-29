import type { ParachainId } from '@grass-protocol/chain'
import { chainsParachainIdToChainId } from '@grass-protocol/chain'
import { useBlockNumber as useWagmiBlockNumber } from 'wagmi'

export const useBlockNumber = (chainId: ParachainId) => {
  const { data } = useWagmiBlockNumber({
    chainId: chainsParachainIdToChainId[chainId],
  })

  return data
}
