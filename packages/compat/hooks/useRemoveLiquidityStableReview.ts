import type { ParachainId } from '@grass-protocol/chain'
import type { Amount, Token, Type } from '@grass-protocol/currency'
import type { CalculatedStbaleSwapLiquidity, StableSwapWithBase } from '@grass-protocol/wagmi'
import { useRemoveLiquidityStableReview as useWagmiRemoveLiquidityStableReview } from '@grass-protocol/wagmi'
import { useMemo } from 'react'
import { isEvmNetwork } from '../config'

interface UseRemoveLiquidityStableReviewParams {
  chainId: ParachainId
  swap: StableSwapWithBase | undefined
  poolName: string | undefined
  minReviewedAmounts: Amount<Token>[]
  liquidity: CalculatedStbaleSwapLiquidity
  balance: Amount<Type> | undefined
  amountToRemove: Amount<Type> | undefined
  useBase: boolean
}

type UseRemoveLiquidityStableReview = (params: UseRemoveLiquidityStableReviewParams) => {
  isWritePending: boolean
  sendTransaction: (() => void) | undefined
  routerAddress: string | undefined
}

export const useRemoveLiquidityStableReview: UseRemoveLiquidityStableReview = ({
  chainId,
  ...props
}) => {
  const wagmiRemoveLiquidityStableReview = useWagmiRemoveLiquidityStableReview({
    chainId,
    ...props,
  })

  return useMemo(() => {
    if (isEvmNetwork(chainId))
      return wagmiRemoveLiquidityStableReview

    return {
      isWritePending: false,
      sendTransaction: undefined,
      routerAddress: undefined,
    }
  }, [chainId, wagmiRemoveLiquidityStableReview])
}
