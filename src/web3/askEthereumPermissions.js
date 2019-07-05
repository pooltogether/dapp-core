export async function askEthereumPermissions () {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      await window.ethereum.enable()
    } catch (error) {
      if (error !== 'User rejected provider access') {
        console.error(error)
      }
    }
  } else {
    console.warn('Could not find `window` or `window.ethereum` (Browser is not an Ethereum-powered browser?)')
  }
}
