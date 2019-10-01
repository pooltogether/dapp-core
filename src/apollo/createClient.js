import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
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
    link,
    defaultFromBlock,
    writeProvider
  } = options
  const userResolvers = options.resolvers || {}
  const initialCacheData = options.initialCacheData || {}

  const ethersResolver = options.ethersResolver || new EthersResolver({
    abiMapping,
    provider,
    defaultFromBlock
  })
  const ethereumLink = new EthereumLink(ethersResolver)

  const cache = new InMemoryCache()

  const initCache = () => {
    cache.writeData({
      data: merge(
        initialCacheData,
        {
          transactions: []
        }
      )
    })
  }

  initCache()

  const resolvers = merge(
    { Query },
    { 
      Mutation: {
        sendTransaction: sendTransactionFactory(abiMapping, writeProvider)
      }
    },
    userResolvers
  )

  let apolloLink
  if (link) {
    apolloLink = ApolloLink.from([ethereumLink, link])
  } else {
    apolloLink = ethereumLink
  }

  const client = new ApolloClient({
    cache,
    link: apolloLink,
    resolvers
  })

  client.onResetStore(initCache)

  watchNetworkAndAccount(client)

  return client
}
