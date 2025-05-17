// src/components/ui/Spinner.tsx
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'primary-600',
  className = ''
}) => {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const sizeClass = sizeMap[size];
  
  return (
    <div className={`${className}`}>
      <div className={`animate-spin rounded-full ${sizeClass} border-2 border-solid border-gray-200`}>
        <div className={`rounded-full ${sizeClass} border-2 border-solid border-t-${color} border-r-transparent border-b-transparent border-l-transparent`}></div>
      </div>
    </div>
  );
};

export default Spinner;