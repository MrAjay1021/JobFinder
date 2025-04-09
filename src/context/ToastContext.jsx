import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prevToasts => [...prevToasts, { id, message, type, duration }]);
    return id;
  }, []);

  const removeToast = useCallback(id => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  const successToast = useCallback((message, duration = 3000) => {
    return addToast(message, 'success', duration);
  }, [addToast]);

  const errorToast = useCallback((message, duration = 3000) => {
    return addToast(message, 'error', duration);
  }, [addToast]);

  const value = {
    addToast,
    removeToast,
    successToast,
    errorToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div style={{ 
        position: 'fixed', 
        top: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '10px',
        zIndex: 1000 
      }}>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContext; 