import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authBackground from '../assets/images/auth-background.jpg';

const styles = {
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
  },
  formColumn: {
    marginTop: '100px',
    width: '44%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0 40px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '30px',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '24px',
    width: '100%',
  },
  input: {
    color: '#595959',
    padding: '15px 26px',
    fontSize: '16px',
    borderColor: '#9c9c9c',
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    width: '100%',
    height: '50px',
    borderRadius: '5px',
    outline: 'none',
  },
  submitButton: {
    color: '#ffffff',
    marginTop: '24px',
    padding: '12px 30px',
    fontSize: '18px',
    fontWeight: '700',
    backgroundColor: '#ed5353',
    height: '50px',
    minWidth: '150px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  linkRow: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  linkText: {
    color: '#666',
    fontSize: '16px',
  },
  link: {
    color: '#ed5353',
    fontSize: '16px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  imageColumn: {
    height: '100vh',
    width: '56%',
    backgroundImage: `url(${authBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    maxWidth: '80%',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  errorText: {
    color: '#ed5353',
    marginBottom: '15px',
    fontSize: '14px',
  },
  // Media queries would need to be handled with JavaScript in inline styles
  '@media (max-width: 1050px)': {
    container: {
      flexDirection: 'column',
    },
    formColumn: {
      width: '100%',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
    imageColumn: {
      width: '100%',
      height: '300px',
    },
  }
};

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

  // Apply responsive styles based on window width
  const isMobile = window.innerWidth <= 1050;
  const containerStyle = {
    ...styles.container,
    ...(isMobile ? { flexDirection: 'column' } : {})
  };
  
  const formColumnStyle = {
    ...styles.formColumn,
    ...(isMobile ? { width: '100%', paddingLeft: '20px', paddingRight: '20px' } : {})
  };
  
  const imageColumnStyle = {
    ...styles.imageColumn,
    ...(isMobile ? { width: '100%', height: '300px' } : {})
  };

  return (
    <div style={containerStyle}>
      <div style={formColumnStyle}>
        <h1 style={styles.title}>Already have an account?</h1>
        <p style={styles.subtitle}>Your personal job finder is here</p>
        
        {error && <div style={styles.errorText}>{error}</div>}
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <input
              type="email"
              name="email"
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <input
              type="password"
              name="password"
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" style={styles.submitButton}>Sign in</button>
          
          <div style={styles.linkRow}>
            <span style={styles.linkText}>Don't have an account?</span>
            <Link to="/register" style={styles.link}>Sign Up</Link>
          </div>
        </form>
      </div>
      
      <div style={imageColumnStyle}>
        <h2 style={styles.imageText}>Your Personal Job Finder</h2>
      </div>
    </div>
  );
};

export default Login; 