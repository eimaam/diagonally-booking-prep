import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const pad: Record<NonNullable<ICardProps['padding']>, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = ({ padding = 'md', className, ...rest }: ICardProps) => (
  <div
    className={cn(
      'rounded-lg border border-brand-border bg-brand-surface shadow-sm',
      pad[padding],
      className,
    )}
    {...rest}
  />
);

export default Card;
