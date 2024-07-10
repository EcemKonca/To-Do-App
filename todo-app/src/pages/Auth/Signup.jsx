import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar'

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending request...');
      const response = await fetch('http://localhost/todoapp/api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      console.log('Response:', response);

      if (!response.ok) {
        console.error('Network response was not ok');
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.message) {
        navigate('/login'); // Login sayfasına yönlendirin
      } else {
        setError(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error caught in catch block:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-24">
        <div className="max-w-md mx-auto card">
          <h2 className="text-3xl font-bold text-center">Signup</h2>
          <form className="mt-6" onSubmit={handleSubmit}>
            {error && <p className="text-danger text-sm mb-4">{error}</p>}
            <input
              type="text"
              placeholder="Username"
              className="input-box"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input-box mt-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
  );
}

export default Signup;
