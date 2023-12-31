import type { ParachainId } from '@grass-protocol/chain'
import { Updater } from './TokenListsUpdater'

interface Props {
  chainIds: ParachainId[]
}

export function Updaters({ chainIds }: Props) {
  return (
    <>
      {chainIds.map(chainId => (
        <Updater key={chainId} chainId={chainId} />
      ))}
    </>
  )
}
