import { getReadProvider } from '../../../web3/getReadProvider'

const debug = require('debug')('dapp-core:networkId')

/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */
export const networkId = async function (opts, args, context, info) {
  debug('Starting...')
  let { readProvider } = context
  let provider
  if (!readProvider) {
    provider = await getReadProvider()
  } else {
    provider = await readProvider()
  }
  const network = await provider.getNetwork()
  debug(network.chainId)
  return network.chainId
}