import type { StableSwap } from '@grass-protocol/amm'

export interface StableSwapWithBase extends StableSwap {
  baseSwap?: StableSwap
}
