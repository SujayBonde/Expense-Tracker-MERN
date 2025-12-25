import { useContext } from 'react'
import TransactionContext from '../context/TransactionContext'

function Balance() {
  const { transactions } = useContext(TransactionContext)

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, item) => (acc += item.amount), 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, item) => (acc += item.amount), 0)

  const total = totalIncome - totalExpense

  return (
    <div className='mb-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 p-6 rounded-2xl shadow-xl text-white transform transition hover:scale-105 duration-300'>
      <h4 className='text-lg uppercase font-medium tracking-wider opacity-90'>Your Balance</h4>
      <h1 className='text-5xl font-extrabold mt-2'>₹{total.toFixed(2)}</h1>
    </div>
  )
}

export default Balance
