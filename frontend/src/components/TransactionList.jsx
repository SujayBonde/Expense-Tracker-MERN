import { useContext, useEffect } from 'react'
import TransactionContext from '../context/TransactionContext'
import AuthContext from '../context/AuthContext'
import TransactionItem from './TransactionItem'

function TransactionList() {
  const { transactions, getTransactions, isLoading, isError, message } = useContext(TransactionContext)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (user) {
      getTransactions(user.token)
    }
  }, [user, isError, message]) // removed getTransactions to avoid loop? No, getTransactions is stable if from context.

  if (isLoading) {
    return <div className="text-center">Loading transactions...</div>
  }

  return (
    <>
      <h3 className="text-xl font-bold mb-3 border-b pb-2">History</h3>
      <ul className='list space-y-2'>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </>
  )
}

export default TransactionList
