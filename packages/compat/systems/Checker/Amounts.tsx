import type { Amount, Type } from '@grass-protocol/currency'
import type { FC } from 'react'

import { Checker as WagmiChecker } from '@grass-protocol/wagmi'
import { Checker as BifrostChecker } from '@grass-protocol/parachains-bifrost'
import { isEvmNetwork } from '../../config'
import type { CheckerButton } from './types'

export interface AmountsProps extends CheckerButton {
  chainId: number | undefined
  amounts: (Amount<Type> | undefined)[]
}

export const Amounts: FC<AmountsProps> = ({
  chainId,
  children,
  ...rest
}) => {
  if (chainId && isEvmNetwork(chainId)) {
    return (
      <WagmiChecker.Amounts chainId={chainId} {...rest}>
        {children}
      </WagmiChecker.Amounts>
    )
  }

  return (
    <BifrostChecker.Amounts chainId={chainId} {...rest}>
      {children}
    </BifrostChecker.Amounts>
  )
}
