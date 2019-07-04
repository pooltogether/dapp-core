import gql from 'graphql-tag'

export const blockSubscription = gql`
  subscription blockSubscription {
    block @block
  }
`