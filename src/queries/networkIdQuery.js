import gql from 'graphql-tag'

export const networkIdQuery = gql`
  query networkIdQuery {
    networkId @client
  }
`