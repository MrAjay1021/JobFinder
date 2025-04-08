import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerContent}`}>
          <Link to="/" className={styles.logo}>Jobfinder</Link>
          <div className={styles.authButtons}>
            <Link to="/login" className={`${styles.authButton} ${styles.loginButton}`}>Login</Link>
            <Link to="/register" className={`${styles.authButton} ${styles.registerButton}`}>Register</Link>
          </div>
        </div>
      </header>
      
      <main className={styles.container}>
        <div className={styles.searchContainer}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Type any job title"
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div className={styles.jobListContainer}>
          <h2>Welcome to JobFinder</h2>
          <p>Please login or register to view and apply for jobs.</p>
        </div>
      </main>
    </div>
  );
};

export default HomePage; 