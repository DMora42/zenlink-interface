import { chainsParachainIdToChainId } from '@grass-protocol/chain'
import { Token } from '@grass-protocol/currency'
import { Dialog } from '@grass-protocol/ui'
import type { FC, ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FetchTokenArgs } from 'wagmi/actions'
import { useTokens } from '../../hooks'

import { TokenSelectorImportRow } from './TokenSelectorImportRow'

interface TokenListImportCheckerProps {
  children: ReactNode
  onAddTokens: (tokens: Token[]) => void
  tokens?: { address: string; chainId: number }[]
  tokenMap: Record<string, Token>
  customTokensMap: Record<string, Token>
}

export const TokenListImportChecker: FC<TokenListImportCheckerProps> = ({
  onAddTokens,
  tokenMap,
  customTokensMap,
  tokens,
  children,
}) => {
  const _tokens = useMemo(() => {
    if (!tokens || Object.keys(tokenMap).length === 0)
      return []
    return tokens.filter((el) => {
      return !(el.address in tokenMap) && !(el.address.toLowerCase() in customTokensMap)
    })
  }, [customTokensMap, tokenMap, tokens])

  return (
    <_TokenListImportChecker
      onAddTokens={onAddTokens}
      tokens={_tokens}
      tokenMap={tokenMap}
      customTokensMap={customTokensMap}
    >
      {children}
    </_TokenListImportChecker>
  )
}

const _TokenListImportChecker: FC<TokenListImportCheckerProps & { tokens: { address: string; chainId: number }[] }> = ({
  children,
  tokens,
  onAddTokens,
  tokenMap,
  customTokensMap,
}) => {
  const [open, setOpen] = useState(false)

  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  const { data: currencies } = useTokens({
    tokens: tokens.map(el => ({
      address: el.address,
      chainId: chainsParachainIdToChainId[el.chainId],
    })) as FetchTokenArgs[],
  })

  const _currencies = useMemo(() => {
    if (!currencies)
      return
    return currencies.map((el, idx) => {
      const { address, name, symbol, decimals } = el
      return new Token({ address, name, symbol, decimals, chainId: tokens[idx].chainId })
    })
  }, [currencies, tokens])

  const handleImport = useCallback(() => {
    if (!currencies)
      return

    if (onAddTokens && _currencies)
      onAddTokens(_currencies)

    onClose()
  }, [_currencies, currencies, onAddTokens, onClose])

  useEffect(() => {
    if (!tokens)
      return
    tokens.forEach((el) => {
      if (!(el.address in tokenMap) && !(el.address.toLowerCase() in customTokensMap))
        setOpen(true)
    })
  }, [customTokensMap, tokenMap, tokens])

  return (
    <>
      {children}
      {_currencies && (
        <Dialog open={open} onClose={onClose}>
          <Dialog.Content>
            <Dialog.Header
              onClose={() => setOpen(false)}
              title={_currencies.length > 1 ? 'Import Tokens' : 'Import Token'}
            />
            <TokenSelectorImportRow currencies={_currencies} onImport={handleImport} slideIn={false} />
          </Dialog.Content>
        </Dialog>
      )}
    </>
  )
}
