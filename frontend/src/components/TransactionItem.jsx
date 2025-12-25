import { useContext } from 'react'
import TransactionContext from '../context/TransactionContext'
import AuthContext from '../context/AuthContext'
import { FaTrash, FaEdit } from 'react-icons/fa'

function TransactionItem({ transaction }) {
  const { deleteTransaction, editTransaction } = useContext(TransactionContext)
  const { user } = useContext(AuthContext)

  const sign = transaction.type === 'expense' ? '-' : '+'
  const borderColor = transaction.type === 'expense' ? 'border-rose-500' : 'border-emerald-500'

  return (
    <li className={`bg-white shadow-sm hover:shadow-md p-4 flex justify-between items-center relative group ${borderColor} rounded-xl mb-3 transition-all duration-200 border-l-4 border-r-0`}>
      <button 
        onClick={() => deleteTransaction(transaction._id, user.token)} 
        className='absolute -left-3 -top-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg hover:bg-red-600'
      >
        <FaTrash size={12} />
      </button>
      <button 
        onClick={() => editTransaction(transaction)} 
        className='absolute -right-3 -top-3 bg-blue-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg hover:bg-blue-600'
      >
        <FaEdit size={12} />
      </button>
      <div className='flex flex-col ml-2'>
        <span className='font-bold text-gray-800 text-lg'>{transaction.text}</span>
        <span className='text-xs text-gray-400 uppercase tracking-widest'>{transaction.category}</span>
      </div>
      <span className={transaction.type === 'expense' ? 'text-rose-500 font-extrabold text-lg' : 'text-emerald-500 font-extrabold text-lg'}>
        {sign}₹{Math.abs(transaction.amount)}
      </span>
    </li>
  )
}

export default TransactionItem
