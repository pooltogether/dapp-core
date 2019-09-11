export async function askEthereumPermissions (requestPopUp = true) {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      await window.ethereum.enable(requestPopUp)
    } catch (error) {
      if (error !== 'User rejected provider access') {
        console.error(error)
      }
    }
  } else {
    const msg = 'Could not find `window` or `window.ethereum` (Browser is not an Ethereum-powered browser?)'
    console.warn(msg)
  }
}
