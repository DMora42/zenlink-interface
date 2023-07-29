import type { ParachainId } from '@grass-protocol/chain'
import type { FC } from 'react'
import { Profile as WagmiProfile } from '@grass-protocol/wagmi'
import { Profile as BifrostProfile } from '@grass-protocol/parachains-bifrost'
import { useSettings } from '@grass-protocol/shared'
import { isEvmNetwork, isSubstrateNetwork } from '../../config'

interface ProfileProps {
  supportedNetworks: ParachainId[]
  notifications: Record<number, string[]>
  clearNotifications(): void
}

export const Profile: FC<ProfileProps> = ({
  supportedNetworks,
  notifications,
  clearNotifications,
}) => {
  const [{ parachainId }] = useSettings()

  if (isEvmNetwork(parachainId)) {
    return (
      <WagmiProfile
        notifications={notifications}
        clearNotifications={clearNotifications}
        supportedNetworks={supportedNetworks}
      />
    )
  }

  if (isSubstrateNetwork(parachainId)) {
    return (
      <BifrostProfile
        parachainId={parachainId}
        notifications={notifications}
        clearNotifications={clearNotifications}
        supportedNetworks={supportedNetworks}
      />
    )
  }

  return <span />
}
