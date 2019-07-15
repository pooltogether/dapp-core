import gql from 'graphql-tag'

export const systemInfoQuery = gql`
  query systemInfoQuery {
    systemInfo @client
  }
`