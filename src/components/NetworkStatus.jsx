import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  if (isOnline) {
    return null; // Don't show anything when online
  }
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#ff4d4f',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <span style={{ 
        display: 'inline-block', 
        width: '10px', 
        height: '10px', 
        backgroundColor: 'white',
        borderRadius: '50%'
      }}></span>
      You are currently offline
    </div>
  );
};

export default NetworkStatus; 