import { account } from './queries/account'
import { block } from './queries/block'
import { ethereumPermission } from './queries/ethereumPermission'
import { networkId } from './queries/networkId'
import { systemInfo } from './queries/systemInfo'

const debug = require('debug')('dapp-core:boundQuery')

function wrap(fxn, extraContext) {
  return function (opts, args, context, info) {
    debug(extraContext)
    return fxn(opts, args, Object.assign({}, context, extraContext), info)
  }
}

export function boundQuery({ readProvider, writeProvider }) {
  const extraContext = { readProvider, writeProvider }
  return {
    account: wrap(account, extraContext),
    block: wrap(block, extraContext),
    ethereumPermission,
    networkId: wrap(networkId, extraContext),
    systemInfo
  }
}
