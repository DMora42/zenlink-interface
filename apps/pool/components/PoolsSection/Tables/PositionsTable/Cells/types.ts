import type { LiquidityPosition, POOL_TYPE } from '@grass-protocol/graph-client'

export interface CellProps {
  row: LiquidityPosition<POOL_TYPE>
}
