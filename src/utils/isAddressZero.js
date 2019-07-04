import { ZERO_ADDRESS } from './constants'

export function isAddressZero (address) {
  return !address || address === ZERO_ADDRESS
}
