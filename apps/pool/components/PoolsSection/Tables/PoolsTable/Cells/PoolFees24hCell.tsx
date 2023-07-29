import { formatUSD } from '@grass-protocol/format'
import { Typography } from '@grass-protocol/ui'
import type { FC } from 'react'

import type { CellProps } from './types'

export const PoolFees24hCell: FC<CellProps> = ({ row }) => {
  const volume = formatUSD(row.fees1d)

  return (
    <Typography variant="sm" weight={600} className="text-right text-slate-900 dark:text-slate-50">
      {volume.includes('NaN') ? '$0.00' : volume}
    </Typography>
  )
}
