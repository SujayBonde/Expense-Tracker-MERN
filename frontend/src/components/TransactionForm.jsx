import { useState, useContext, useEffect } from 'react'
import TransactionContext from '../context/TransactionContext'
import AuthContext from '../context/AuthContext'
import { toast } from 'react-toastify'

function TransactionForm() {
  const [text, setText] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Other')
  const [type, setType] = useState('expense')

  const { addTransaction, updateTransaction, transactionToEdit } = useContext(TransactionContext)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (transactionToEdit.edit === true) {
      setText(transactionToEdit.item.text)
      setAmount(transactionToEdit.item.amount)
      setCategory(transactionToEdit.item.category)
      setType(transactionToEdit.item.type)
    }
  }, [transactionToEdit])

  const onSubmit = (e) => {
    e.preventDefault()

    if (amount === 0) {
        toast.error('Amount cannot be zero');
        return;
    }

    const newTransaction = {
      text,
      amount: +amount, // Convert to number
      category,
      type
    }

    if (transactionToEdit.edit === true) {
      updateTransaction(transactionToEdit.item._id, newTransaction, user.token)
    } else {
      addTransaction(newTransaction, user.token)
    }

    setText('')
    setAmount('')
    setCategory('Other')
    setType('expense')
  }

  return (
    <section className='form mb-10 bg-white p-6 rounded-2xl shadow-xl'>
      <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">{transactionToEdit.edit ? 'Edit Transaction' : 'Add New Transaction'}</h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className='form-control'>
          <label htmlFor='text' className="block font-bold text-gray-700 mb-2">Description</label>
          <input 
            type='text' 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder='e.g. Salary, Rent, Coffee' 
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition bg-gray-50"
            required
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount' className="block font-bold text-gray-700 mb-2">Amount (₹)</label>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter amount...'
            className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition bg-gray-50"
            required
          />
        </div>
        <div className="flex gap-4">
            <div className='form-control flex-1'>
            <label htmlFor='category' className="block font-bold text-gray-700 mb-2">Category</label>
            <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition bg-gray-50 bg-white"
            >
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Rent">Rent</option>
                <option value="Shopping">Shopping</option>
                <option value="Salary">Salary</option>
                <option value="Investment">Investment</option>
                <option value="Other">Other</option>
            </select>
            </div>
            <div className='form-control flex-1'>
            <label htmlFor='type' className="block font-bold text-gray-700 mb-2">Type</label>
            <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition bg-gray-50 bg-white"
            >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
            </div>
        </div>
        <button className={`btn ${transactionToEdit.edit ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600' : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700'} text-white py-3 rounded-xl font-bold mt-4 transition shadow-lg transform active:scale-95`}>
            {transactionToEdit.edit ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </form>
    </section>
  )
}

export default TransactionForm
