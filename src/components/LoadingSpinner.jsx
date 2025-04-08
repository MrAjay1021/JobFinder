import React from 'react';

const LoadingSpinner = ({ size = 40, color = '#f05252' }) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: `4px solid rgba(0, 0, 0, 0.1)`,
    borderLeft: `4px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    display: 'inline-block',
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default LoadingSpinner; 