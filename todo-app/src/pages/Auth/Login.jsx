import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!password) {
      setError('Please enter a password')
      return
    }

    setError('')

    // Call the login API here

    navigate('/dashboard')
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-24">
        <div className="max-w-md mx-auto card">
          <h2 className="text-3xl font-bold text-center">Login</h2>
          <form className="mt-6" onSubmit={handleLogin}>
            {error && <p className="text-danger text-sm mb-4">{error}</p>}
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-box mt-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="button-primary mt-6">
              Login
            </button>
          </form>
          <p className="mt-6 text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
