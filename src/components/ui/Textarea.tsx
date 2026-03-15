import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
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
      <textarea
        className="input-premium-field min-h-[140px] resize-none"
        {...props}
      />
      {error && <span className="text-xs font-bold text-red-500 px-1 mt-1">{error}</span>}
    </div>
  );
};
