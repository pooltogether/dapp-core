import { ethers } from 'ethers'
import { twoDecimalPlaces } from './twoDecimalPlaces'

export function displayWeiToEther (wei) {
  if (wei === 0) {
    wei = ethers.utils.bigNumberify(0)
  }

  if (!wei) {
    return ''
  }

  const etherValueAsString = ethers.utils.commify(
    ethers.utils.formatEther(wei.toString(), { commify: true })
  )

  let amount = twoDecimalPlaces(etherValueAsString)

  // If the amount ends in .0 or .00 strip out the needless decimal values
  amount = amount.replace(/\.00$/, '').replace(/\.0$/, '')

  return amount
}
