import { useContext } from 'react'
import TransactionContext from '../context/TransactionContext'

function IncomeExpenses() {
  const { transactions } = useContext(TransactionContext)

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2)

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2)

  return (
    <div className='flex bg-white shadow-xl p-6 justify-between my-8 rounded-2xl border border-gray-100'>
      <div className='flex-1 text-center border-r border-gray-200'>
        <h4 className='uppercase text-gray-500 font-bold text-sm tracking-wide mb-2'>Income</h4>
        <p className='text-emerald-500 text-2xl font-black'>+₹{income}</p>
      </div>
      <div className='flex-1 text-center'>
        <h4 className='uppercase text-gray-500 font-bold text-sm tracking-wide mb-2'>Expense</h4>
        <p className='text-rose-500 text-2xl font-black'>-₹{expense}</p>
      </div>
    </div>
  )
}

export default IncomeExpenses
