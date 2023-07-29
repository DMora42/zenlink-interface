import type { Token } from '@grass-protocol/currency'
import type { Pair } from '../Pair'
import type { StableSwap } from '../StablePool'

export interface MultiPath {
  stable: boolean
  input: Token
  output: Token
  pair?: Pair
  pool?: StableSwap
  basePool?: StableSwap
  fromBase?: boolean
}
