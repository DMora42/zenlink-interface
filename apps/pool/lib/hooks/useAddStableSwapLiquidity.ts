import type { Token } from '@grass-protocol/currency'
import { Amount } from '@grass-protocol/currency'
import { ZERO } from '@grass-protocol/math'
import type { CalculatedStbaleSwapLiquidity, StableSwapWithBase } from '@grass-protocol/wagmi'
import { useMemo } from 'react'
import { calculateStableSwapTokenAmount } from 'lib/functions'

export function useAddStableSwapLiquidity(
  swap: StableSwapWithBase | undefined,
  amounts: Amount<Token>[],
  useBase: boolean,
): CalculatedStbaleSwapLiquidity {
  const allAmounts = useMemo(
    () => {
      const baseAmounts = swap?.baseSwap && useBase
        ? swap.baseSwap.pooledTokens.map(
          token => amounts.find(amount => amount.currency.equals(token)) || Amount.fromRawAmount(token, ZERO),
        )
        : []

      const metaAmounts = swap?.baseSwap
        ? swap.pooledTokens.map(
          token => token.equals(swap.baseSwap!.liquidityToken) && useBase
            ? Amount.fromRawAmount(token, ZERO)
            : amounts.find(amount => amount.currency.equals(token)) || Amount.fromRawAmount(token, ZERO),
        )
        : swap?.pooledTokens.map(
          token => amounts.find(amount => amount.currency.equals(token)) || Amount.fromRawAmount(token, ZERO),
        ) ?? []

      return { baseAmounts, metaAmounts }
    },
    [amounts, swap?.baseSwap, swap?.pooledTokens, useBase],
  )

  return useMemo(
    () => {
      const { baseAmounts, metaAmounts } = allAmounts

      try {
        return {
          amount: swap
            ? calculateStableSwapTokenAmount(
              swap,
              useBase,
              metaAmounts,
              baseAmounts,
              true,
            )
            : undefined,
          baseAmounts,
          metaAmounts,
        }
      }
      catch {
        return {
          amount: undefined,
          baseAmounts: [],
          metaAmounts: [],
        }
      }
    },
    [allAmounts, swap, useBase],
  )
}
