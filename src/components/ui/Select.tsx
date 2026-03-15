import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  width?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className = '',
  width,
  style,
  ...props
}) => {

  return (
    <div className={`input-premium-wrapper ${className}`}>
      {label && (
        <label className="input-premium-label">
          {label}
        </label>
      )}
      <div className="relative group">
        <select
          className="input-premium-field appearance-none cursor-pointer pr-10"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
      {error && <span className="text-xs font-bold text-red-500 px-1 mt-1">{error}</span>}
    </div>
  );
};
