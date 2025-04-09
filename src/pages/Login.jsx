import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from '../styles/Auth.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const { email, password } = formData;

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      // Store the token
      localStorage.setItem('token', data.token);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formSection}>
        <h1 className={styles.pageTitle}>Already have an account?</h1>
        <p className={styles.subTitle}>Your personal job finder is here</p>
        
        {error && <p className={styles.errorText}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
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
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoadingSpinner size={20} color="#fff" /> Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
        
        <p className={styles.altText}>
          Don't have an account? <Link to="/register" className={styles.altLink}>Sign Up</Link>
        </p>
      </div>
      
      <div className={styles.imageSection}>
        <h2 className={styles.imageTitle}>Your Personal Job Finder</h2>
      </div>
    </div>
  );
};

export default Login; 