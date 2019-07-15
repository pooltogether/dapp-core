import { account } from './queries/account'
import { block } from './queries/block'
import { ethereumPermission } from './queries/ethereumPermission'
import { networkId } from './queries/networkId'
import { systemInfo } from './queries/systemInfo'

/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */
export const Query = {
  account,
  block,
  ethereumPermission,
  networkId,
  systemInfo
}
