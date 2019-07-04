import { ethers } from 'ethers'

export async function getNetworkName () {
  let tempProvider, network, networkName
  if (typeof window !== 'undefined' && window.ethereum) {
    tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    network = await tempProvider.getNetwork()
    networkName = network.name
  } else if (typeof window !== 'undefined' && window.web3) {
    if (window.web3.currentProvider.isToshi) {
      network = ethers.utils.getNetwork(parseInt(window.web3.version.network, 10))
    } else {
      tempProvider = new ethers.providers.Web3Provider(window.web3.currentProvider)
      network = await tempProvider.getNetwork()
    }
    networkName = network.name
  } else {
    if (!process.env.REACT_APP_DEFAULT_NETWORK_NAME) {
      networkName = 'rinkeby'
      console.warn('Environment variable `REACT_APP_DEFAULT_NETWORK_NAME` not defined; defaulting to rinkeby')
    } else {
      networkName = process.env.REACT_APP_DEFAULT_NETWORK_NAME
    }
  }

  return networkName
}
