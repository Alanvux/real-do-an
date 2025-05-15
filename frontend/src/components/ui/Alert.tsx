// src/components/ui/Alert.tsx
import React from 'react';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  InformationCircleIcon, 
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';

interface AlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  // Define colors and icons based on alert type
  const alertStyles = {
    success: {
      bgColor: 'bg-success-50',
      textColor: 'text-success-800',
      borderColor: 'border-success-400',
      icon: <CheckCircleIcon className="h-5 w-5 text-success-500" aria-hidden="true" />,
    },
    error: {
      bgColor: 'bg-danger-50',
      textColor: 'text-danger-800',
      borderColor: 'border-danger-400',
      icon: <XCircleIcon className="h-5 w-5 text-danger-500" aria-hidden="true" />,
    },
    info: {
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-800',
      borderColor: 'border-primary-400',
      icon: <InformationCircleIcon className="h-5 w-5 text-primary-500" aria-hidden="true" />,
    },
    warning: {
      bgColor: 'bg-warning-50',
      textColor: 'text-warning-800',
      borderColor: 'border-warning-400',
      icon: <ExclamationCircleIcon className="h-5 w-5 text-warning-500" aria-hidden="true" />,
    },
  };

  const { bgColor, textColor, borderColor, icon } = alertStyles[type];

  return (
    <div className={`rounded-md p-4 ${bgColor} border ${borderColor} shadow-md max-w-md`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className={`ml-3 ${textColor}`}>
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={`inline-flex rounded-md p-1.5 ${textColor} hover:bg-opacity-20 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${type}-500`}
                onClick={onClose}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;