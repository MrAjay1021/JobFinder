import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import '../styles/Header.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { successToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    successToast('Logged out successfully');
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__shape-left" />
      <div className="header__shape-middle" />
      <div className="header__shape-right" />
      
      <Link to="/" className="header__logo">Jobfinder</Link>
      
      <div className="header__nav">
        {isAuthenticated ? (
          <>
            {user && (
              <span className="header__nav-link">
                Hello! {user.name}
              </span>
            )}
            <span className="header__nav-link" onClick={handleLogout}>
              Logout
            </span>
          </>
        ) : (
          <Link to="/login" className="header__login-btn">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header; 