import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Add this for navigation
import axios from 'axios';
import './login.css';

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Add this for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'https://apk.doctor9.com/doctor/auth',
        {
          USER_NAME: username,
          PASSWORD: password
        },
        {
          headers: {
            deviceid: 'postman'
          }
        }
      );

      const data = response.data;

      if (data.TOKEN) {
        // Store the token in local storage and state
        setToken(data.TOKEN);
        localStorage.setItem('token', data.TOKEN);
        alert('Login successful');
        navigate('/sms');  // Redirect to SMS page after successful login
      } else {
        setError('Invalid login credentials');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
