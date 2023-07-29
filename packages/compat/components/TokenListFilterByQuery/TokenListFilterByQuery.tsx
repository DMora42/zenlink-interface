import type { ParachainId } from '@grass-protocol/chain'
import type { Token, Type } from '@grass-protocol/currency'
import type { Fraction } from '@grass-protocol/math'
import type { FC, RefObject } from 'react'
import { TokenListFilterByQuery as WagmiTokenListFilterByQuery } from '@grass-protocol/wagmi'
import { TokenListFilterByQuery as BifrostTokenListFilterByQuery } from '@grass-protocol/parachains-bifrost'
import { isEvmNetwork } from '../../config'
import type { BalanceMap } from '../../hooks/useBalance/types'

interface RenderProps {
  currencies: Type[]
  inputRef: RefObject<HTMLInputElement>
  query: string
  onInput(query: string): void
  searching: boolean
  queryToken: [Token | undefined]
}

interface Props {
  chainId?: ParachainId
  tokenMap: Record<string, Token>
  pricesMap?: Record<string, Fraction>
  balancesMap?: BalanceMap
  children(props: RenderProps): JSX.Element
  includeNative?: boolean
}

export const TokenListFilterByQuery: FC<Props> = ({
  chainId,
  ...props
}) => {
  if (chainId && isEvmNetwork(chainId))
    return <WagmiTokenListFilterByQuery chainId={chainId} {...props} />

  return <BifrostTokenListFilterByQuery chainId={chainId} {...props} />
}
