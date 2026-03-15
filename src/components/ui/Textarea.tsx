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
  const baseTextareaStyles = 'w-full px-6 py-4 bg-[#0f172a] border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:bg-[#1e293b] focus:border-[var(--accent-primary)]/60 focus:ring-4 focus:ring-[var(--accent-primary)]/10 transition-all duration-300 shadow-sm font-bold text-lg resize-none min-h-[140px]';
  const errorStyles = error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10' : '';

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {label && (
        <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-1 opacity-80">
          {label}
        </label>
      )}
      <textarea
        className={`${baseTextareaStyles} ${errorStyles}`}
        {...props}
      />
      {error && <span className="text-xs font-bold text-red-500 px-1">{error}</span>}
    </div>
  );
};
