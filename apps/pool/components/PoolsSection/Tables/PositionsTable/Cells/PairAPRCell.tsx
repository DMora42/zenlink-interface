import { formatPercent } from '@grass-protocol/format'
import { Typography } from '@grass-protocol/ui'
import type { FC } from 'react'

import type { CellProps } from './types'

export const PairAPRCell: FC<CellProps> = ({ row }) => {
  return (
    <Typography variant="sm" weight={600} className="flex items-center justify-end gap-1 text-slate-900 dark:text-slate-50">
      {formatPercent(row.pool.apr)}
    </Typography>
  )
}
