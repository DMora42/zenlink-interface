import { formatUSD } from '@grass-protocol/format'
import { useInViewport } from '@grass-protocol/hooks'
import { Typography } from '@grass-protocol/ui'
import type { FC } from 'react'
import { useRef } from 'react'

import { PoolPositionProvider } from 'components'
import type { CellProps } from './types'

export const PairValueCell: FC<CellProps> = ({ row }) => {
  const ref = useRef<HTMLDivElement>(null)
  const inViewport = useInViewport(ref)
  return (
    <div ref={ref}>
      {inViewport && (
        <PoolPositionProvider watch={false} pool={row.pool}>
          <_PairValueCell row={row} />
        </PoolPositionProvider>
      )}
    </div>
  )
}

const _PairValueCell: FC<CellProps> = ({ row }) => {
  return (
    <Typography variant="sm" weight={600} className="text-right text-slate-900 dark:text-slate-50">
      {formatUSD(row.valueUSD)}
    </Typography>
  )
}
