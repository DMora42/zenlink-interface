import type { Type } from '@grass-protocol/currency'
import { addressToZenlinkAssetId } from '@grass-protocol/format'

export function isNativeCurrency(currency: Type): boolean {
  // BNC
  const { assetType, assetIndex } = addressToZenlinkAssetId(currency.wrapped.address)
  return assetType === 0 && assetIndex === 0
}
