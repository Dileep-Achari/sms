import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/login';
import SmsPage from './components/sms';

const App = () =>
{
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() =>
  {
    // Check if token exists in local storage on component mount
    const storedToken = localStorage.getItem('token');
    if (storedToken)
    {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default route - If not logged in, go to login page */}
        <Route path="/" element={!token ? <LoginPage setToken={setToken} /> : <Navigate to="/sms" />} />

        {/* Route for SMS page */}
        <Route path="/sms" element={token ? <SmsPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
