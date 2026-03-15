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
  const baseSelectStyles = 'w-full px-6 py-4 bg-[var(--bg-tertiary)]/30 border border-white/5 rounded-2xl text-[var(--text-primary)] focus:bg-[var(--bg-secondary)] focus:border-[var(--accent-primary)]/40 focus:ring-4 focus:ring-[var(--accent-primary)]/10 transition-all duration-300 shadow-sm font-black appearance-none cursor-pointer';

  return (
    <div className={`flex flex-col gap-2.5 ${className}`} style={{ width }}>
      {label && (
        <label className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-widest px-1">
          {label}
        </label>
      )}
      <div className="relative group">
        <select
          className={baseSelectStyles}
          style={{ ...style, width: width || '100%', padding: '10px' }}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
      {error && <span className="text-xs font-bold text-red-500 px-1">{error}</span>}
    </div>
  );
};
