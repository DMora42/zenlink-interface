import type { ParachainId } from '@grass-protocol/chain'
import type { Amount, Type } from '@grass-protocol/currency'
import { useStakeLiquidityReview as useWagmiStakeLiquidityReview } from '@grass-protocol/wagmi'
import { useStakeLiquidityStandardReview as useBifrostStakeLiquidityStandardReview } from '@grass-protocol/parachains-bifrost'
import { useMemo } from 'react'
import { isEvmNetwork } from '../config'

interface UseStakeLiquidityStandardReviewParams {
  chainId: ParachainId
  pid: number
  amountToStake: Amount<Type> | undefined
}

type UseStakeLiquidityStandardReview = (params: UseStakeLiquidityStandardReviewParams) => {
  isWritePending: boolean
  sendTransaction: (() => void) | undefined
  farmAddress: string | undefined
}

export const useStakeLiquidityStandardReview: UseStakeLiquidityStandardReview = ({
  chainId,
  ...params
}) => {
  const wagmiStakeLiquidityStandardReview = useWagmiStakeLiquidityReview({
    chainId,
    ...params,
  })

  const bifrostStakeLiquidityStandardReview = useBifrostStakeLiquidityStandardReview({
    chainId,
    ...params,
  })

  return useMemo(() => {
    if (chainId && isEvmNetwork(chainId))
      return wagmiStakeLiquidityStandardReview

    return bifrostStakeLiquidityStandardReview
  }, [bifrostStakeLiquidityStandardReview, chainId, wagmiStakeLiquidityStandardReview])
}
