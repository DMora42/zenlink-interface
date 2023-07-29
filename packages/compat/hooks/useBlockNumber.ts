import type { ParachainId } from '@grass-protocol/chain'
import { useBlockNumber as useWagmiBlockNumber } from '@grass-protocol/wagmi'
import { useMemo } from 'react'
import { useBlockNumber as useSubstrateBlockNumber } from '@grass-protocol/polkadot'
import { isEvmNetwork } from '../config'

export const useBlockNumber = (chainId: ParachainId) => {
  const wagmiBlockNumber = useWagmiBlockNumber(chainId)
  const substrateBlockNumber = useSubstrateBlockNumber(chainId)

  return useMemo(() => {
    if (isEvmNetwork(chainId))
      return wagmiBlockNumber ? Number(wagmiBlockNumber) : undefined
    return substrateBlockNumber?.toNumber()
  }, [chainId, substrateBlockNumber, wagmiBlockNumber])
}
