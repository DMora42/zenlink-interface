import { formatUSD } from '@grass-protocol/format'
import { Typography } from '@grass-protocol/ui'
import type { FC } from 'react'

import type { CellProps } from './types'

export const PoolTVLCell: FC<CellProps> = ({ row }) => {
  const tvl = formatUSD(row.reserveUSD)
  return (
    <Typography variant="sm" weight={600} className="text-right text-slate-900 dark:text-slate-50">
      {tvl.includes('NaN') ? '$0.00' : tvl}
    </Typography>
  )
}
