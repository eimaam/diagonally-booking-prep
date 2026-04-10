import { useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface IToastProps {
  open: boolean;
  message: string;
  variant?: 'success' | 'error';
  onDismiss: () => void;
  duration?: number;
  className?: string;
}

export const Toast = ({
  open,
  message,
  variant = 'success',
  onDismiss,
  duration = 4200,
  className,
}: IToastProps) => {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => onDismiss(), duration);
    return () => window.clearTimeout(t);
  }, [open, onDismiss, duration]);

  if (!open) return null;

  const isError = variant === 'error';

  return (
    <div
      className={cn(
        'fixed right-4 top-4 z-[60] flex max-w-sm items-center gap-3 rounded-full border px-4 py-3 text-sm text-brand-text shadow-lg',
        isError
          ? 'border-brand-danger bg-brand-toast-error-bg'
          : 'border-brand-primary bg-brand-toast-bg',
        className,
      )}
      role="status"
    >
      <span
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-brand-on-primary',
          isError ? 'bg-brand-danger-icon-bg' : 'bg-brand-primary',
        )}
        aria-hidden
      >
        {isError ? '!' : '✓'}
      </span>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
