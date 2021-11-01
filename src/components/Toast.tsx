import React from 'react';
import { Slide, toast } from 'react-toastify';

interface ToastOptions {
  title?: string;
  message: string | React.ReactNode;
  type: 'info' | 'success' | 'warning' | 'error';
}

const Toast = ({ title, message, type }: ToastOptions) => {
  let colorScheme = 'gray-500';
  switch (type) {
    case 'info':
      colorScheme = 'blue-600';
      break;
    case 'success':
      colorScheme = 'green-600';
      break;
    case 'warning':
      colorScheme = 'yellow-600';
      break;
    case 'error':
      colorScheme = 'red-600';
      break;
    default:
      break;
  }
  toast((
    <div>
      {title && <h4 className={`font-medium text-xl text-${colorScheme}`}>{title}</h4>}
      <p className={`font-medium text-sm mb-0 text-${colorScheme}`} role="alert">{message}</p>
    </div>
  ), {
    transition: Slide,
    type,
    autoClose: 3000,
    className: `border border-${colorScheme}`,
    hideProgressBar: true,
    progress: undefined,
  });
};

export default Toast;
