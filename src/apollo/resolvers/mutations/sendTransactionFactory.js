import { sendTransactionWithOptions } from 'apollo-link-ethereum-mutations-ethersjs'

import { getWriteProvider } from '../../../web3/getWriteProvider'

export const sendTransactionFactory = function (abiMapping, writeProvider) {
  return async function (rootData, args, context, info) {
    let provider
    if (typeof writeProvider === 'function') {
      provider = await writeProvider()
    } else if (writeProvider) {
      provider = writeProvider
    } else {
      provider = await getWriteProvider()
    }
    const options = {
      provider,
      abiMapping
    }
    const fn = sendTransactionWithOptions(options)
    return fn(rootData, args, context, info)
  }
}