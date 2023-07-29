import { AppSettings, NetworkSelector, Profile, useAccount } from '@grass-protocol/compat'
import { useNotifications } from '@grass-protocol/shared'
import { App, AppType } from '@grass-protocol/ui'
import React from 'react'
import { SUPPORTED_CHAIN_IDS } from '../config'

export const Header = () => {
  const { address } = useAccount()
  const [notifications, { clearNotifications }] = useNotifications(address)

  return (
    <App.Header
      withScrollBackground={true}
      apptype={AppType.Pool}
      nav={
        <>
          <App.NavItem href="https://app.zenlink.pro/swap" label="Swap" />
          <App.NavItem href="https://app.zenlink.pro/pool" label="Pools" />
          <App.NavItem href="https://app.zenlink.pro/referrals" label="Referrals" />
        </>
      }
    >
      <div className="flex items-center gap-2">
        <AppSettings />
        <NetworkSelector supportedNetworks={SUPPORTED_CHAIN_IDS} />
        <Profile
          supportedNetworks={SUPPORTED_CHAIN_IDS}
          notifications={notifications}
          clearNotifications={clearNotifications}
        />
      </div>
    </App.Header>
  )
}
