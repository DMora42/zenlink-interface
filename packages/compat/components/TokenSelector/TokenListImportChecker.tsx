import type { ParachainId } from '@grass-protocol/chain'
import type { Token } from '@grass-protocol/currency'
import type { FC, ReactNode } from 'react'
import { TokenListImportChecker as WagmiTokenListImportChecker } from '@grass-protocol/wagmi'
import { TokenListImportChecker as BifrostTokenListImportChecker } from '@grass-protocol/parachains-bifrost'
import { isEvmNetwork } from '../../config'

interface TokenListImportCheckerProps {
  chainId: ParachainId
  children: ReactNode
  onAddTokens: (tokens: Token[]) => void
  tokens?: { address: string; chainId: number }[]
  tokenMap: Record<string, Token>
  customTokensMap: Record<string, Token>
}

export const TokenListImportChecker: FC<TokenListImportCheckerProps> = ({
  chainId,
  children,
  ...props
}) => {
  if (isEvmNetwork(chainId))
    return <WagmiTokenListImportChecker {...props}>{children}</WagmiTokenListImportChecker>

  return <BifrostTokenListImportChecker>{children}</BifrostTokenListImportChecker>
}
