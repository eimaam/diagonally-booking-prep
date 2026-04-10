import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface IBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'muted';
}

export const Badge = ({ variant = 'default', className, ...rest }: IBadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide',
      variant === 'default' && 'bg-brand-badge-bg text-brand-badge-text',
      variant === 'muted' && 'border border-brand-border bg-brand-surface-muted text-brand-text-subtle',
      className,
    )}
    {...rest}
  />
);

export default Badge;
