import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import authBackground from '../assets/images/auth-background.jpg';

const baseStyles = {
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { register } = useAuth();
  const { successToast, errorToast } = useToast();
  const navigate = useNavigate();

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  // Responsive styles
  const styles = { ...baseStyles };

  // Large Desktop and Default (1200px+)
  // No changes needed

  // Desktop (992px - 1199px)
  if (windowWidth <= 1200) {
    styles.formColumn = {
      ...styles.formColumn,
      width: '50%',
      padding: '0 30px',
    };
    styles.imageColumn = {
      ...styles.imageColumn,
      width: '50%',
    };
    styles.title = {
      ...styles.title,
      fontSize: '28px',
    };
    styles.subtitle = {
      ...styles.subtitle,
      fontSize: '16px',
    };
  }

  // Tablet (768px - 991px)
  if (windowWidth <= 992) {
    styles.container = {
      ...styles.container,
      flexDirection: 'column-reverse',
    };
    styles.formColumn = {
      ...styles.formColumn,
      width: '100%',
      marginTop: '40px',
      padding: '0 30px',
    };
    styles.imageColumn = {
      ...styles.imageColumn,
      width: '100%',
      height: '300px',
    };
    styles.imageText = {
      ...styles.imageText,
      fontSize: '28px',
    };
  }

  // Mobile (576px - 767px)
  if (windowWidth <= 768) {
    styles.formColumn = {
      ...styles.formColumn,
      padding: '0 20px',
      marginTop: '30px',
    };
    styles.title = {
      ...styles.title,
      fontSize: '24px',
    };
    styles.subtitle = {
      ...styles.subtitle,
      fontSize: '15px',
      marginBottom: '20px',
    };
    styles.input = {
      ...styles.input,
      padding: '12px 20px',
      fontSize: '15px',
      height: '45px',
    };
    styles.submitButton = {
      ...styles.submitButton,
      fontSize: '16px',
      height: '45px',
      padding: '10px 20px',
    };
    styles.linkRow = {
      ...styles.linkRow,
      flexDirection: 'column',
      alignItems: 'flex-start',
    };
    styles.checkboxLabel = {
      ...styles.checkboxLabel,
      fontSize: '13px',
    };
  }

  // Small Mobile (< 576px)
  if (windowWidth <= 576) {
    styles.imageColumn = {
      ...styles.imageColumn,
      height: '200px',
    };
    styles.imageText = {
      ...styles.imageText,
      fontSize: '22px',
    };
    styles.title = {
      ...styles.title,
      fontSize: '22px',
    };
    styles.subtitle = {
      ...styles.subtitle,
      fontSize: '14px',
    };
    styles.formGroup = {
      ...styles.formGroup,
      marginBottom: '18px',
    };
    styles.input = {
      ...styles.input,
      padding: '10px 16px',
      fontSize: '14px',
      height: '42px',
    };
    styles.submitButton = {
      ...styles.submitButton,
      fontSize: '15px',
      height: '42px',
    };
    styles.checkboxContainer = {
      ...styles.checkboxContainer,
      gap: '8px',
      marginBottom: '15px',
    };
    styles.checkboxLabel = {
      ...styles.checkboxLabel,
      fontSize: '12px',
    };
  }

  return (
    <div style={styles.container}>
      <div style={styles.formColumn}>
        <h1 style={styles.title}>Create an account</h1>
        <p style={styles.subtitle}>Your personal job finder is here</p>
        
        {error && <div style={styles.errorText}>{error}</div>}
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <input
              type="text"
              name="name"
              style={styles.input}
              placeholder="Full Name"
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
              style={{
                ...styles.customCheckbox,
                ...(formData.agreeToTerms ? styles.checkedCheckbox : {})
              }}
              onClick={() => setFormData({...formData, agreeToTerms: !formData.agreeToTerms})}
            >
              {formData.agreeToTerms && <span style={styles.checkmark}>✓</span>}
            </div>
            <label 
              style={styles.checkboxLabel}
              onClick={() => setFormData({...formData, agreeToTerms: !formData.agreeToTerms})}
            >
              By creating an account, I agree to our terms of use and privacy policy
            </label>
          </div>
          
          <button type="submit" style={styles.submitButton}>
            Create Account
          </button>
          
          <div style={styles.linkRow}>
            <span style={styles.linkText}>Already have an account?</span>
            <Link to="/login" style={styles.link}>Login</Link>
          </div>
        </form>
      </div>
      
      <div style={styles.imageColumn}>
        <div style={styles.imageText}>Find your dream job here</div>
      </div>
    </div>
  );
};

export default Register; 