/**
  Checks to see if the user is using CoinBase Wallet
*/
export function isToshi () {
  return typeof window !== 'undefined' && window.web3 && window.web3.currentProvider.isToshi
}
