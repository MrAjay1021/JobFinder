import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1 className="auth-title">Already have an account?</h1>
        <p className="auth-subtitle">Your personal job finder is here</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="auth-btn">Sign in</button>
          
          <div className="auth-link-container">
            <span className="auth-link-text">Don't have an account?</span>
            <Link to="/register" className="auth-link">Sign Up</Link>
          </div>
        </form>
      </div>
      
      <div className="auth-image" style={{ backgroundImage: `url(${require('../assets/image466.png')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h2 className="auth-image-text">Your Personal Job Finder</h2>
      </div>
    </div>
  );
};

export default Login; 