import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`input-premium-wrapper ${className}`}>
      {label && (
        <label className="input-premium-label">
          {label}
        </label>
      )}
      <input
        className="input-premium-field"
        {...props}
      />
      {error && <span className="text-xs font-bold text-red-500 px-1 mt-1">{error}</span>}
    </div>
  );
};
