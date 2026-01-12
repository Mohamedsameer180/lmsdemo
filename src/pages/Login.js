import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Login.css';

// Mock login - In production, integrate with your auth system
export const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Mock authentication
    if (credentials.email === 'admin@lms.com' && credentials.password === 'admin123') {
      localStorage.setItem('token', 'mock-jwt-token-for-admin');
      localStorage.setItem('role', 'admin');
      toast.success('Logged in as Admin');
      navigate('/admin/settings');
    } else if (credentials.email === 'user@lms.com' && credentials.password === 'user123') {
      localStorage.setItem('token', 'mock-jwt-token-for-user');
      localStorage.setItem('role', 'user');
      toast.success('Logged in as User');
      navigate('/');
    } else {
      toast.error('Invalid credentials. Try admin@lms.com/admin123 or user@lms.com/user123');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to LMS</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <div className="login-help">
          <p><strong>Admin Login:</strong> admin@lms.com / admin123</p>
          <p><strong>User Login:</strong> user@lms.com / user123</p>
        </div>
      </div>
    </div>
  );
};