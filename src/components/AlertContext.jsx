// src/contexts/AlertContext.jsx
import  { createContext, useState, useContext, useCallback } from 'react';
import AlertToast from '../components/AlertToast';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    show: false,
    message: '',
    type: 'info',
    duration: 4000,
  });

  const showAlert = useCallback((message, type = 'info', duration = 4000) => {
    setAlertState({
      show: true,
      message,
      type,
      duration,
    });

    // Auto-close if duration is set
    if (duration > 0) {
      setTimeout(() => {
        hideAlert();
      }, duration);
    }
  }, []);

  const hideAlert = useCallback(() => {
    setAlertState(prev => ({ ...prev, show: false }));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <AlertToast
        show={alertState.show}
        message={alertState.message}
        type={alertState.type}
        duration={alertState.duration}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};