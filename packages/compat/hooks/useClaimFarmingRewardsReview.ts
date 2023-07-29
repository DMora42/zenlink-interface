import type { ParachainId } from '@grass-protocol/chain'
import { useClaimFarmingRewardsReview as useWagmiClaimFarmingRewardsReview } from '@grass-protocol/wagmi'
import { useClaimFarmingRewardsReview as useBifrostClaimFarmingRewardsReview } from '@grass-protocol/parachains-bifrost'
import { useMemo } from 'react'
import { isEvmNetwork } from '../config'

interface UseClaimFarmingRewardsReviewParams {
  chainId: ParachainId
  pid: number
}

type UseClaimFarmingRewardsReview = (params: UseClaimFarmingRewardsReviewParams) => {
  isWritePending: boolean
  sendTransaction: (() => void) | undefined
  farmAddress: string | undefined
}

export const useClaimFarmingRewardsReview: UseClaimFarmingRewardsReview = ({
  chainId,
  ...params
}) => {
  const wagmiClaimFarmingRewardsReview = useWagmiClaimFarmingRewardsReview({
    chainId,
    ...params,
  })

  const bifrostClaimFarmingRewardsReview = useBifrostClaimFarmingRewardsReview({
    chainId,
    ...params,
  })

  return useMemo(() => {
    if (chainId && isEvmNetwork(chainId))
      return wagmiClaimFarmingRewardsReview

    return bifrostClaimFarmingRewardsReview
  }, [bifrostClaimFarmingRewardsReview, chainId, wagmiClaimFarmingRewardsReview])
}
