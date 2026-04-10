import type { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '../../lib/utils';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  fullWidth?: boolean;
}

const variantClass: Record<NonNullable<IButtonProps['variant']>, string> = {
  primary:
    'bg-brand-primary text-brand-on-primary hover:bg-brand-primary-hover focus-visible:ring-brand-primary',
  secondary:
    'bg-brand-surface-muted text-brand-text border border-brand-border hover:border-brand-border-strong',
  ghost: 'bg-transparent text-brand-primary-muted hover:bg-brand-surface-muted',
  outline:
    'border border-brand-border bg-transparent text-brand-text hover:border-brand-primary hover:text-brand-primary-muted',
};

export const Button:FC<IButtonProps> = ({
  variant = 'primary',
  fullWidth,
  className,
  type = 'button',
  ...rest
}) => (
  <button
    type={type}
    className={cn(
      'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg disabled:pointer-events-none disabled:opacity-50',
      variantClass[variant],
      fullWidth && 'w-full',
      className,
    )}
    {...rest}
  />
);

export default Button;
