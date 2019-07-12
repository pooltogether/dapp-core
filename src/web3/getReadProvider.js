import { ethers } from 'ethers'
import { getNetworkName } from './getNetworkName'
import { getWriteProvider } from './getWriteProvider'
import { getSystemInfo } from '../utils/getSystemInfo'

let provider

/**
  Retrieves a new provider specific to read.  The reason we separate the read and the writes is that the
  web3 providers on mobile dapps are extremely buggy; it's better to read the network through an INFURA
  JsonRpc endpoint.

  This function will first check to see if there is an injected web3.  If web3 is being injected, then a
  Ethers Web3Provider is instantiated to check the network.  Once the network is determined the Ethers
  getDefaultProvider function is used to create a provider pointing to the same network using an Infura node.
*/
export async function getReadProvider ({ defaultNetworkName } = {}) {
  if (provider) { return provider }

  const systemInfo = await getSystemInfo()
  if (systemInfo.hasWeb3Available) {
    provider = await getWriteProvider()
  } else {
    let networkName = defaultNetworkName || 'homestead'
    if (networkName === 'localhost') {
      provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
    } else {
      provider = ethers.getDefaultProvider(networkName)
    }
  }

  return provider
}
