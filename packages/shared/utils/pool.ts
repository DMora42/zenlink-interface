import type { Pool } from '@grass-protocol/graph-client'

export function isPoolEnabledFarms(pool: Pool): boolean {
  return pool.farm !== undefined && pool.farm.some(
    ({ incentives }) =>
      incentives.some(({ rewardPerDay }) => Number(rewardPerDay) > 0),
  )
}
