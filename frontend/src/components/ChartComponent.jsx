import { useContext, useEffect } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts'
import TransactionContext from '../context/TransactionContext'
import AuthContext from '../context/AuthContext'

function ChartComponent() {
  const { analytics, getAnalyticsData, transactions } = useContext(TransactionContext) // Dependency on transactions to refresh
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
        getAnalyticsData(user.token)
    }
  }, [user, transactions]) // Refresh when transactions change

  if (!analytics) return <div>Loading charts...</div>

  // Prepare data for Pie Chart (Expense by Category)
  const categoryData = Object.keys(analytics.categories).map(key => ({
    name: key,
    value: analytics.categories[key]
  }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3'];

  // Prepare data for Bar Chart (Income vs Expense)
  const barData = [
    {
      name: 'Income',
      amount: analytics.totalIncome
    },
    {
      name: 'Expense',
      amount: analytics.totalExpense
    }
  ]

  return (
    <div className='my-10 grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='bg-white shadow p-5 rounded'>
            <h3 className="text-xl font-bold mb-4 text-center">Expense by Category</h3>
            {categoryData.length > 0 ? (
                <div className="h-64 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value}`} />
                        <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-10">No expenses to display</p>
            )}
        </div>

        <div className='bg-white shadow p-5 rounded'>
            <h3 className="text-xl font-bold mb-4 text-center">Income vs Expense</h3>
                <div className="h-64 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={barData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `₹${value}`} />
                            <Tooltip formatter={(value) => `₹${value}`} />
                            <Bar dataKey="amount" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
        </div>
    </div>
  )
}

export default ChartComponent
