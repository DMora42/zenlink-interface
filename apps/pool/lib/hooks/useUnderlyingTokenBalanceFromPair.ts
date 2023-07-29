import type { Token, Type } from '@grass-protocol/currency'
import { Amount } from '@grass-protocol/currency'
import { ZERO } from '@grass-protocol/math'
import { useMemo } from 'react'

interface Params {
  totalSupply: Amount<Token> | undefined
  reserves: Amount<Type>[]
  balance: Amount<Type> | undefined
}

type UseUnderlyingTokenBalanceFromPoolParams = (params: Params) => Amount<Type>[]

export const useUnderlyingTokenBalanceFromPool: UseUnderlyingTokenBalanceFromPoolParams = ({
  balance,
  totalSupply,
  reserves,
}) => {
  return useMemo(() => {
    if (!balance || !totalSupply || !reserves.length)
      return []

    if (totalSupply.equalTo(ZERO))
      return reserves.map(reserve => Amount.fromRawAmount(reserve.wrapped.currency, '0'))

    return reserves.map(reserve => reserve.wrapped.multiply(balance.wrapped.divide(totalSupply)))
  }, [balance, reserves, totalSupply])
}
