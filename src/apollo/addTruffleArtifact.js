export function addTruffleArtifact (abiMapping, name, abi, truffleJsonArtifact) {
  abiMapping.addAbi(name, abi)
  Object.keys(truffleJsonArtifact.networks).forEach(networkId => {
    abiMapping.addAddress(name, parseInt(networkId), truffleJsonArtifact.networks[networkId].address)
  })
}