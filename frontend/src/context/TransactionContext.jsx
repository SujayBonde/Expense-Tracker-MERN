import { createContext, useState, useEffect } from 'react'
import transactionService from './transactionService'

const TransactionContext = createContext()

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [transactionToEdit, setTransactionToEdit] = useState({ item: {}, edit: false })
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const getTransactions = async (token) => {
    setIsLoading(true)
    try {
      const data = await transactionService.getTransactions(token)
      setTransactions(data)
    } catch (error) {
      setIsError(true)
      setMessage(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
      )
    }
    setIsLoading(false)
  }

  const addTransaction = async (transactionData, token) => {
    setIsLoading(true)
    try {
      const data = await transactionService.createTransaction(transactionData, token)
      setTransactions([...transactions, data])
    } catch (error) {
      setIsError(true)
      setMessage(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
      )
    }
    setIsLoading(false)
  }

  const deleteTransaction = async (id, token) => {
    setIsLoading(true)
    try {
      await transactionService.deleteTransaction(id, token)
      setTransactions(transactions.filter((transaction) => transaction._id !== id))
    } catch (error) {
      setIsError(true)
      setMessage(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
      )
    }
    setIsLoading(false)
  }



  const updateTransaction = async (id, updItem, token) => {
    setIsLoading(true)
    try {
      const data = await transactionService.updateTransaction(id, updItem, token)
      setTransactions(transactions.map((item) => (item._id === id ? { ...item, ...data } : item)))
      setTransactionToEdit({ item: {}, edit: false })
    } catch (error) {
      setIsError(true)
      setMessage(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
      )
    }
    setIsLoading(false)
  }

  const editTransaction = (item) => {
    setTransactionToEdit({
      item,
      edit: true,
    })
  }

  const getAnalyticsData = async (token) => {
    setIsLoading(true)
    try {
      const data = await transactionService.getAnalytics(token)
      setAnalytics(data)
    } catch (error) {
      setIsError(true)
      setMessage(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
      )
    }
    setIsLoading(false)
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        analytics,
        transactionToEdit,
        isError,
        isSuccess,
        isLoading,
        message,
        getTransactions,
        deleteTransaction,
        addTransaction,
        updateTransaction,
        editTransaction,
        getAnalyticsData
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export default TransactionContext
