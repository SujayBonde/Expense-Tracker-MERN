import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import Balance from '../components/Balance'
import IncomeExpenses from '../components/IncomeExpenses'

import ChartComponent from '../components/ChartComponent'

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div className="pb-20">
      <section className='heading my-5'>
        <h1 className="text-3xl font-bold">Welcome {user && user.name}</h1>
        <p className="text-gray-600">Here is your financial overview.</p>
      </section>

      <ChartComponent />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
            <Balance />
            <IncomeExpenses />
            <TransactionForm />
        </div>
        <div>
            <TransactionList />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
