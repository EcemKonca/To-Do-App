import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!name) {
      setError('Please enter your name')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!password) {
      setError('Please enter a password')
      return
    }

    setError('')

    // Call the signup API here

    navigate('/login')
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-24">
        <div className="max-w-md mx-auto card">
          <h2 className="text-3xl font-bold text-center">Signup</h2>
          <form className="mt-6" onSubmit={handleSignup}>
            {error && <p className="text-danger text-sm mb-4">{error}</p>}
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box mt-4"
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
              Signup
            </button>
          </form>
          <p className="mt-6 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup
