import { networkId } from './queries/networkId'
import { account } from './queries/account'
import { block } from './queries/block'

/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */
export const Query = {
  networkId,
  account,
  block
}
