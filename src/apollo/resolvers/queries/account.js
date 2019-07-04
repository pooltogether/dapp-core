import { getWriteProvider } from '../../../web3/getWriteProvider'
import { isToshi } from '../../../web3/isToshi'

const debug = require('debug')('pt:web3Resolvers')

/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */
export const account = async function () {
  if (isToshi()) {
    debug('is toshi')
    let accounts = window.web3.eth.accounts
    if (accounts.length) {
      return accounts[0]
    }
  } else {
    let provider
    try {
      provider = await getWriteProvider()
      debug('got write provider: ', !!provider)
    } catch (e) {
      console.error(e)
    }
    if (!provider) {
      debug('no provider!')
      return null
    }
    try {
      const signer = provider.getSigner()
      debug('signer: ', signer)
      const address = await signer.getAddress()
      debug('got address: ', address)
      return address
    } catch (err) {
      debug('ERROR: ', err)
      if (err.message.indexOf('unknown account') === -1) {
        console.error(`Error in web3Resolvers#account: ${err}`)
      }
      return null
    }
  }
}