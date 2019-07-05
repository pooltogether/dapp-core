import { getSystemInfo } from '../utils/getSystemInfo'

export async function hasEthereumPermissions () {
  // The first OR conditional works for MetaMask
  // The second OR conditional works for Coinbase Wallet, etc
  const systemInfo = await getSystemInfo()
  
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