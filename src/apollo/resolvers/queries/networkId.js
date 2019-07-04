import { getReadProvider } from '../../../web3/getReadProvider'

/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */
export const networkId = async function () {
  const provider = await getReadProvider()
  const network = await provider.getNetwork()
  return network.chainId
}