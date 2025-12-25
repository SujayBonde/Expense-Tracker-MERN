import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function Header() {
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  const onLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className='flex justify-between items-center py-4 px-8 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100 mb-10'>
      <div className='logo text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent cursor-pointer tracking-tighter' onClick={() => navigate('/')}>
        ExpenseTracker
      </div>
      <ul className='flex items-center gap-6'>
        {user ? (
          <li>
            <button className='btn flex items-center gap-2 text-gray-600 hover:text-rose-500 font-semibold transition-colors duration-200' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login' className='flex items-center gap-2 text-gray-600 hover:text-violet-600 font-semibold transition-colors duration-200'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register' className='flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
