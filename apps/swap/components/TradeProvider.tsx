import type { TradeType } from '@grass-protocol/amm'
import type { Amount, Type } from '@grass-protocol/currency'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { useAggregatorTrade, useTrade as useSingleTrade } from 'lib/hooks'
import type { UseTradeOutput } from 'lib/hooks'
import { AGGREGATOR_ENABLED_NETWORKS } from 'config'
import { useAccount } from '@grass-protocol/compat'
import { useSettings } from '@grass-protocol/shared'

interface TradeContext extends UseTradeOutput {
  isLoading: boolean
  isSyncing: boolean
  isError: boolean
}

const Context = createContext<TradeContext | undefined>(undefined)

interface TradeProviderProps {
  chainId: number | undefined
  tradeType: TradeType.EXACT_INPUT | TradeType.EXACT_OUTPUT
  amountSpecified: Amount<Type> | undefined
  mainCurrency: Type | undefined
  otherCurrency: Type | undefined
  children: ReactNode
}

export const TradeProvider: FC<TradeProviderProps> = ({
  chainId,
  tradeType,
  amountSpecified,
  mainCurrency,
  otherCurrency,
  children,
}) => {
  const [{ aggregator, slippageTolerance }] = useSettings()
  const { address } = useAccount()
  const toUseAggregator = useMemo(
    () => Boolean(chainId && aggregator && AGGREGATOR_ENABLED_NETWORKS.includes(chainId)),
    [aggregator, chainId],
  )

  const { trade: singleTrade } = useSingleTrade(
    chainId,
    tradeType,
    amountSpecified,
    mainCurrency,
    otherCurrency,
  )
  const { trade: aggregatorTrade, isLoading, isError, isSyncing } = useAggregatorTrade({
    chainId,
    fromToken: mainCurrency,
    toToken: otherCurrency,
    amount: amountSpecified,
    recipient: address,
    enabled: toUseAggregator,
    slippageTolerance,
  })

  return (
    <Context.Provider value={
      useMemo(
        () => ({
          trade: toUseAggregator ? aggregatorTrade : singleTrade,
          isLoading: toUseAggregator ? isLoading : false,
          isSyncing: toUseAggregator ? isSyncing : false,
          isError: toUseAggregator ? isError : false,
        }),
        [aggregatorTrade, isError, isLoading, isSyncing, singleTrade, toUseAggregator],
      )
    }>
      {children}
    </Context.Provider>
  )
}

export const useTrade = () => {
  const context = useContext(Context)
  if (!context)
    throw new Error('Hook can only be used inside Pool Position Staked Context')

  return context
}
