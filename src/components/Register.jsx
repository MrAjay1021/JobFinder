import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
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
    marginTop: '80px',
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
  checkboxContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '20px',
  },
  customCheckbox: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    border: '1px solid #9c9c9c',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
  },
  checkedCheckbox: {
    backgroundColor: '#ed5353',
    border: '1px solid #ed5353',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#666',
    flex: 1,
  },
  checkmark: {
    color: 'white',
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
  const { successToast, errorToast } = useToast();
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
      errorToast('You must agree to the terms and conditions');
      return;
    }
    
    try {
      await register(formData, successToast, errorToast);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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

  const checkboxStyle = {
    ...styles.customCheckbox,
    ...(formData.agreeToTerms ? styles.checkedCheckbox : {})
  };

  return (
    <div style={containerStyle}>
      <div style={formColumnStyle}>
        <h1 style={styles.title}>Create an account</h1>
        <p style={styles.subtitle}>Your personal job finder is here</p>
        
        {error && <div style={styles.errorText}>{error}</div>}
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <input
              type="text"
              name="name"
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
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
              type="tel"
              name="mobile"
              style={styles.input}
              placeholder="Mobile"
              value={formData.mobile}
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
          
          <div style={styles.checkboxContainer}>
            <div 
              style={checkboxStyle} 
              onClick={() => setFormData({...formData, agreeToTerms: !formData.agreeToTerms})}
            >
              {formData.agreeToTerms && (
                <span style={styles.checkmark}>✓</span>
              )}
            </div>
            <label style={styles.checkboxLabel}>
              By creating an account, I agree to our terms of use and privacy policy
            </label>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              style={{ display: 'none' }}
            />
          </div>
          
          <button type="submit" style={styles.submitButton}>Create Account</button>
          
          <div style={styles.linkRow}>
            <span style={styles.linkText}>Already have an account?</span>
            <Link to="/login" style={styles.link}>Sign In</Link>
          </div>
        </form>
      </div>
      
      <div style={imageColumnStyle}>
        <h2 style={styles.imageText}>Your Personal Job Finder</h2>
      </div>
    </div>
  );
};

export default Register; 