import type { Amount, Currency } from '@grass-protocol/currency'
import type { FC } from 'react'
import { Approve as WagmiApprove } from '@grass-protocol/wagmi'
import { Approve as BifrostApprove } from '@grass-protocol/parachains-bifrost'
import { isEvmNetwork } from '../../config'
import type { ApprovalButtonRenderProp, ApproveButton } from './types'

type RenderPropPayload = ApprovalButtonRenderProp

export interface TokenApproveButtonProps extends ApproveButton<RenderPropPayload> {
  chainId: number | undefined
  watch?: boolean
  amount?: Amount<Currency>
  address?: string
}

export const TokenApproveButton: FC<TokenApproveButtonProps> = ({ chainId, ...props }) => {
  if (!chainId)
    return <></>
  if (isEvmNetwork(chainId))
    return <WagmiApprove.Token {...props} />

  return <BifrostApprove.Token />
}
