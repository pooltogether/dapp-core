import { hasEthereumPermissions } from '../../../web3/hasEthereumPermissions'

/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */
export const ethereumPermission = async function () {
  return await hasEthereumPermissions()
}