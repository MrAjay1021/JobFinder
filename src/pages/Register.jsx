import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from '../styles/Auth.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    agreedToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const { name, email, mobile, password, agreedToTerms } = formData;

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      setError('You must agree to the terms of use and privacy policy');
      return;
    }
    
    // Validate form data
    if (!name || !email || !mobile || !password) {
      setError('All fields are required');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Log the data being sent to the server
      console.log('Sending registration data:', { 
        name, 
        email, 
        password: '***', 
        role: 'seeker',
        mobile 
      });
      
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          role: 'seeker',
          mobile 
        })
      });
      
      const data = await response.json();
      
      // Log the response from the server
      console.log('Server response:', data);
      
      if (!response.ok) {
        if (data.error === 'User already exists') {
          throw new Error('An account with this email already exists. Please try logging in or use a different email address.');
        }
        throw new Error(data.error || 'Registration failed');
      }
      
      // Store the token
      localStorage.setItem('token', data.token);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formSection}>
        <h1 className={styles.pageTitle}>Create an account</h1>
        <p className={styles.subTitle}>Your personal job finder is here</p>
        
        {error && <p className={styles.errorText}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Name"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Email"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <input
              type="tel"
              name="mobile"
              value={mobile}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Mobile"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Password"
              required
            />
          </div>
          
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={agreedToTerms}
              onChange={handleChange}
              id="terms"
              required
            />
            <label htmlFor="terms">
              By creating an account, I agree to our terms of use and privacy policy
            </label>
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoadingSpinner size={20} color="#fff" /> Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        
        <p className={styles.altText}>
          Already have an account? <Link to="/login" className={styles.altLink}>Sign In</Link>
        </p>
      </div>
      
      <div className={styles.imageSection}>
        <h2 className={styles.imageTitle}>Your Personal Job Finder</h2>
      </div>
    </div>
  );
};

export default Register; 