import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/todoapp/api/authenticate.php', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username_or_email: usernameOrEmail, password }),
        credentials: 'include', // Oturum bilgilerini ekle
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.message) {
        navigate('/dashboard');
      } else {
        setError('Username or password is incorrect. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-24">
        <div className="max-w-md mx-auto card">
          <h2 className="text-3xl font-bold text-center">Login</h2>
          <form className="mt-6" onSubmit={handleSubmit}>
            {error && <p className="text-danger text-sm mb-4">{error}</p>}
            <input
              type="text"
              placeholder="Username or Email"
              className="input-box"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-box mt-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
  );
}

export default Login;
