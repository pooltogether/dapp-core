const debug = require('debug')('dapp-core:askEthereumPermissions')

export async function askEthereumPermissions (requestPopUp = true) {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      debug(`ethereum.enable(${requestPopUp})`)
      await window.ethereum.enable(requestPopUp)
      debug(`enabled!`)
    } catch (error) {
      const msg = error.message
      if (/User rejected provider access/i.test(msg)) {
        console.error(error)
      } else if (/got 1 arguments/i.test(msg)) { // Opera doesn't support passing a boolean
        if (requestPopUp) { // only if we wanted a pop-up, otherwise ignore and fail
          await window.ethereum.enable()
          debug('Enabled ethereum')
        }
      }
    }
  } else {
    const msg = 'Could not find `window` or `window.ethereum` (Browser is not an Ethereum-powered browser?)'
    console.warn(msg)
  }
}
