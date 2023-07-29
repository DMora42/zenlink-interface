import type { Amount, Type } from '@grass-protocol/currency'
import { formatTransactionAmount } from '@grass-protocol/format'
import { ZERO } from '@grass-protocol/math'
import { usePrices } from '@grass-protocol/shared'
import { useMemo } from 'react'

interface Params {
  chainId: number | undefined
  amounts: (Amount<Type> | undefined)[]
}

type UseTokenAmountDollarValues = (params: Params) => (string | undefined)[]

export const useTokenAmountDollarValues: UseTokenAmountDollarValues = ({ chainId, amounts }) => {
  const { data: prices } = usePrices({ chainId })

  return useMemo(() => {
    return amounts.map((amount) => {
      if (!amount?.greaterThan(ZERO) || !prices?.[amount.currency.wrapped.address])
        return undefined
      const price = Number(Number(amount.toExact()) * Number(prices[amount.currency.wrapped.address].toFixed(10)))

      if (Number.isNaN(price) || price < 0.000001)
        return '< 0.000001'

      return formatTransactionAmount(price)
    })
  }, [amounts, prices])
}
