import { getSystemInfo } from '../utils/getSystemInfo'

const debug = require('debug')('dapp-core:hasEthereumPermissions')

export async function hasEthereumPermissions () {
  // The first OR conditional works for MetaMask
  // The second OR conditional works for Coinbase Wallet, etc
  const systemInfo = await getSystemInfo()
  
  debug({ systemInfo })

  return (
    (
      systemInfo &&
      systemInfo.hasWeb3Permission
    ) ||
    (
      systemInfo &&
      systemInfo.hasWeb3Available &&
      systemInfo.hasWeb3Permission === undefined
    )
  )
}