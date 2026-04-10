import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export const Input = ({ label, id, error, className, ...rest }: IInputProps) => (
  <div className={cn('flex flex-col gap-2', className)}>
    <label
      htmlFor={id}
      className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-brand-text-subtle"
    >
      {label}
    </label>
    <input
      id={id}
      className={cn(
        'w-full rounded-lg border border-brand-border bg-brand-surface-input px-3.5 py-3 text-sm text-brand-text placeholder:text-brand-text-muted focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary',
        error && 'border-brand-primary',
      )}
      {...rest}
    />
    {error ? <p className="text-xs text-brand-primary-muted">{error}</p> : null}
  </div>
);

export default Input;
