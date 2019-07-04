import gql from 'graphql-tag'

export const networkAccountQuery = gql`
  query networkAccountQuery {
    networkId @client
    account @client
  }
`