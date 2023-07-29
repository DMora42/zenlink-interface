import type { Amount, Type } from '@grass-protocol/currency'

export type BalanceMap = Record<string, Amount<Type> | undefined> | undefined
