import React, { createContext, useCallback, useContext, useState, useMemo } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children, autoHideDuration = 3000 }) => {
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState({ message: '', severity: 'info' });

  const show = useCallback((message, severity = 'info') => {
    setOpts({ message, severity });
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      success: (msg) => show(msg, 'success'),
      error: (msg) => show(msg, 'error'),
      info: (msg) => show(msg, 'info'),
      warning: (msg) => show(msg, 'warning'),
    }),
    [show]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpen(false)} severity={opts.severity} variant="filled" sx={{ width: '100%' }}>
          {opts.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export default ToastProvider;