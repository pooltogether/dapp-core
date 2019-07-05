import gql from 'graphql-tag'

export const ethereumPermissionQuery = gql`
  query ethereumPermissionQuery {
    ethereumPermission @client
  }
`