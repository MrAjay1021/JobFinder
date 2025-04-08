import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    agreeToTerms: false
  });
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h1 className="auth-title">Create an account</h1>
        <p className="auth-subtitle">Your personal job finder is here</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form className="auth-form register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
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
              type="tel"
              name="mobile"
              className="form-control"
              placeholder="Mobile"
              value={formData.mobile}
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
          
          <div className="checkbox-container">
            <div className="custom-checkbox">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                style={{ opacity: 0, position: 'absolute' }}
              />
              {formData.agreeToTerms && (
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.42857 14L3 9.57143L4.57143 8L7.42857 10.8571L14.4286 3.85714L16 5.42857L7.42857 14Z" fill="white"/>
                </svg>
              )}
            </div>
            <label htmlFor="agreeToTerms" className="checkbox-label">
              By creating an account, I agree to our terms of use and privacy policy
            </label>
          </div>
          
          <button type="submit" className="auth-btn">Create Account</button>
          
          <div className="auth-link-container">
            <span className="auth-link-text">Already have an account?</span>
            <Link to="/login" className="auth-link">Sign In</Link>
          </div>
        </form>
      </div>
      
      <div className="auth-image" style={{ backgroundImage: `url(${require('../assets/image466.png')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h2 className="auth-image-text">Your Personal Job Finder</h2>
      </div>
    </div>
  );
};

export default Register; 