import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

import { AuthProvider } from './context/AuthContext'
import { TransactionProvider } from './context/TransactionContext'

function App() {
  return (
    <>
      <AuthProvider>
        <TransactionProvider>
          <Router>
            <div className='min-h-screen bg-gray-50'>
              <Header />
              <div className='container mx-auto px-4 max-w-6xl font-sans'>
                <Routes>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
          <ToastContainer />
        </TransactionProvider>
      </AuthProvider>
    </>
  )
}

export default App
