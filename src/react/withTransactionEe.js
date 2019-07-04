import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { allTransactionsQuery } from 'apollo-link-ethereum-mutations-ethersjs'

const EventEmitter = require('eventemitter3')

const debug = require('debug')('pt:withTransactionEe')

export function withTransactionEe (Component) {
  return graphql(allTransactionsQuery, { name: 'allTransactionsQuery' })(
    class _withTransactionLifecycle extends PureComponent {
      constructor (props) {
        super(props)
        this.transactionEmitters = {}
        this.onReturn = { onTransaction: this.on }
      }

      componentDidUpdate = (oldProps) => {
        const { transactions } = this.props.allTransactionsQuery || {}
        if (!transactions) { return }
        const oldTransactions = oldProps.allTransactionsQuery ? oldProps.allTransactionsQuery.transactions : []
        Object.keys(this.transactionEmitters).forEach(transactionIdStr => {
          const transactionId = parseInt(transactionIdStr, 10)
          // debug('================= ', typeof transactionId, transactionId, transactions)

          const transaction = transactions.find(t => t.id === transactionId)
          const oldTransaction = oldTransactions.find(t => t.id === transactionId)

          if (transaction.completed && transaction.blockNumber && !transaction.error && (!oldTransaction || !oldTransaction.completed)) {
            this.ee(transactionId).emit('receipt', transaction)
          } else if (transaction.error && (!oldTransaction || !oldTransaction.error)) {
            this.ee(transactionId).emit('error', transaction)
          } else if (transaction.sent && (!oldTransaction || !oldTransaction.sent)) {
            this.ee(transactionId).emit('sent', transaction)
          }
        })
      }

      componentWillUnmount () {
        Object.values(this.transactionEmitters).forEach(ee => {
          ee.removeAllListeners()
        })
      }

      ee = (transactionId) => {
        debug('------------ ', typeof transactionId, transactionId)
        if (!this.transactionEmitters[transactionId]) {
          this.transactionEmitters[transactionId] = new EventEmitter()
        }
        return this.transactionEmitters[transactionId]
      }

      render () {
        return <Component {...this.props} ee={this.ee} />
      }
    }
  )
}
