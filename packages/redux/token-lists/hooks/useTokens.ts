import type { ParachainId } from '@grass-protocol/chain'
import type { Token } from '@grass-protocol/currency'

import type { TokenListsContext } from '../context'
import { useCombinedActiveList } from './useCombinedActiveList'
import { useTokensFromMap } from './useTokensFromMap'

export function useTokens(context: TokenListsContext, chainId: ParachainId | undefined): { [address: string]: Token } {
  return useTokensFromMap(chainId, useCombinedActiveList(context))
}
