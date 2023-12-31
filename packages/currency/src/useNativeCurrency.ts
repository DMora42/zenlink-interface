import { ParachainId } from '@grass-protocol/chain'
import { useMemo } from 'react'

import { Native } from './Native'

export function useNativeCurrency({ chainId = ParachainId.ASTAR }: { chainId?: number }): Native {
  return useMemo(() => Native.onChain(chainId), [chainId])
}
