import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { EthereumLink } from 'apollo-link-ethereum'
import { EthersResolver } from 'apollo-link-ethereum-resolver-ethersjs'
import { merge } from 'lodash'
import { Query } from './resolvers/Query'
import { sendTransactionFactory } from './resolvers/mutations/sendTransactionFactory'

/**
 * Configures and returns the Apollo client using all of it's mutations,
 * resolvers and contract addresses
 *
 * @returns {Object}
 */
export const createClient = function (abiMapping, provider, defaultFromBlock) {
  const ethersResolver = new EthersResolver({
    abiMapping,
    provider,
    defaultFromBlock
  })
  const ethereumLink = new EthereumLink(ethersResolver)

  const cache = new InMemoryCache()

  cache.writeData({
    data: {
      transactions: []
    }
  })

  const resolvers = merge(
    {},
    { Query },
    { 
      Mutation: {
        sendTransaction: sendTransactionFactory(abiMapping)
      }
    }
  )

  const client = new ApolloClient({
    cache,
    resolvers,
    link: ethereumLink
  })

  return client
}
