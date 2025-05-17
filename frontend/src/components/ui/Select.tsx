// src/components/ui/Select.tsx
import React, { SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  label,
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';
  
  return (
    <div className={widthClass}>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={`form-select block rounded-md shadow-sm text-gray-700 ${errorClass} sm:text-sm ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-danger-600">{error}</p>}
    </div>
  );
};

export default Select;