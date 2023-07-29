import type { Status } from '@grass-protocol/graph-client'
import { txStatus } from '@grass-protocol/graph-client'
import { useEffect, useState } from 'react'

export const useWaitForTransaction = (chainId: number, hash: string) => {
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    txStatus(chainId, hash, setStatus)
  }, [chainId, hash])

  return { status }
}
