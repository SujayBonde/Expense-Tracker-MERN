import { useState, useEffect, useContext } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthContext from '../context/AuthContext'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  const { email, password } = formData

  const navigate = useNavigate()
  const { login, reset, user, isLoading, isError, isSuccess, message } = useContext(AuthContext)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    reset()
  }, [user, isError, isSuccess, message, navigate, reset])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    login(userData)
  }

  if (isLoading) {
    return <div className="text-center mt-20 text-2xl">Loading...</div>
  }

  return (
    <>
      <section className='heading text-center mb-10'>
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-2">
          <FaSignInAlt /> Login
        </h1>
        <p className="text-gray-600 text-xl">Login to start managing your expenses</p>
      </section>

      <section className='form max-w-md mx-auto'>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className='form-group'>
            <input
              type='email'
              className='form-control border border-gray-300 p-3 rounded w-full'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control border border-gray-300 p-3 rounded w-full'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block bg-black text-white p-3 rounded w-full hover:bg-gray-800 transition font-bold'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
