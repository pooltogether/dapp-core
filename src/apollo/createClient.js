import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { EthereumLink } from 'apollo-link-ethereum'
import { EthersResolver } from 'apollo-link-ethereum-resolver-ethersjs'
import { merge } from 'lodash'
import { Query } from './resolvers/Query'
import { sendTransactionFactory } from './resolvers/mutations/sendTransactionFactory'
import { watchNetworkAndAccount } from './watchNetworkAndAccount'

/**
 * Configures and returns the Apollo client using all of it's mutations,
 * resolvers and contract addresses
 *
 * @returns {Object}
 */
export const createClient = function (
  options = {}
) {
  const {
    abiMapping,
    provider,
    writeProvider,
    defaultFromBlock
  } = options
  const userResolvers = options.resolvers || {}
  const initialCacheData = options.initialCacheData || {}

  const ethersResolver = new EthersResolver({
    abiMapping,
    provider,
    defaultFromBlock
  })
  const ethereumLink = new EthereumLink(ethersResolver)

  const cache = new InMemoryCache()

  cache.writeData({
    data: merge(
      initialCacheData,
      {
        transactions: []
      }
    )
  })

  const resolvers = merge(
    userResolvers,
    { Query },
    { 
      Mutation: {
        sendTransaction: sendTransactionFactory(abiMapping, writeProvider)
      }
    }
  )

  const client = new ApolloClient({
    cache,
    resolvers,
    link: ethereumLink
  })

  watchNetworkAndAccount(client)

  return client
}
