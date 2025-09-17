'use client';
import { useState, useEffect } from 'react';

export default function Toast({ show, message, type = 'info', duration = 4000, onHide }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onHide) onHide();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onHide]);

  if (!visible) return null;

  const getToastClass = () => {
    switch (type) {
      case 'success':
        return 'text-bg-success';
      case 'danger':
      case 'error':
        return 'text-bg-danger';
      case 'warning':
        return 'text-bg-warning';
      case 'info':
      default:
        return 'text-bg-info';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check-circle-fill';
      case 'danger':
      case 'error':
        return 'exclamation-triangle-fill';
      case 'warning':
        return 'exclamation-triangle-fill';
      case 'info':
      default:
        return 'info-circle-fill';
    }
  };

  return (
    <div 
      className="position-fixed top-0 end-0 p-3" 
      style={{ zIndex: 1055 }}
    >
      <div className={`toast show ${getToastClass()}`} role="alert">
        <div className="d-flex">
          <div className="toast-body d-flex align-items-center">
            <i className={`bi bi-${getIcon()} me-2`}></i>
            {message}
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white me-2 m-auto" 
            onClick={() => {
              setVisible(false);
              if (onHide) onHide();
            }}
          ></button>
        </div>
      </div>
    </div>
  );
}