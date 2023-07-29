import type { Amount, Currency } from '@grass-protocol/currency'
import type { JSBI, Percent } from '@grass-protocol/math'
import { Fraction } from '@grass-protocol/math'

const ONE = new Fraction(1, 1)

export function calculateSlippageAmount(value: Amount<Currency>, slippage: Percent): [JSBI, JSBI] {
  if (slippage.lessThan(0) || slippage.greaterThan(ONE))
    throw new Error('Unexpected slippage')
  return [value.multiply(ONE.subtract(slippage)).quotient, value.multiply(ONE.add(slippage)).quotient]
}
