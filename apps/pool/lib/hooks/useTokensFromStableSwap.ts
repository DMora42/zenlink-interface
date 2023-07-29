import type { Token } from '@grass-protocol/currency'
import type { StableSwapWithBase } from '@grass-protocol/wagmi'
import { useMemo } from 'react'

export function useTokensFromStableSwap(swap?: StableSwapWithBase, useBase = true): Token[] {
  return useMemo(
    () => swap
      ? (useBase && swap.baseSwap)
          ? [
              ...swap.pooledTokens.filter(token => !token.equals(swap.baseSwap!.liquidityToken)),
              ...swap.baseSwap.pooledTokens,
            ]
          : swap.pooledTokens
      : [],
    [swap, useBase],
  )
}
