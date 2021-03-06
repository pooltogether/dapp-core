import { getReadProvider } from '../../../web3/getReadProvider'

const debug = require('debug')('pt:web3Resolvers:block')

/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */
export const block = async function (opts, args, context, info) {
  let { readProvider } = context
  let provider
  if (!readProvider) {
    provider = await getReadProvider()
  } else {
    provider = await readProvider()
  }
  const { blockNumber } = args
  debug('blockNumber: ', blockNumber)
  const block = await provider.getBlock(blockNumber)
  const result = {
    __typename: 'EthersBlock',
    id: blockNumber,
    ...block
  }
  debug(`block(${blockNumber}): `, result)
  return result
}
