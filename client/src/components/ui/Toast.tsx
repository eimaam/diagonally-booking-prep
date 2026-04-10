import { useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface IToastProps {
  open: boolean;
  message: string;
  onDismiss: () => void;
  duration?: number;
  className?: string;
}

export const Toast = ({
  open,
  message,
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

  return (
    <div
      className={cn(
        'fixed right-4 top-4 z-[60] flex max-w-sm items-center gap-3 rounded-full border border-brand-primary bg-brand-toast-bg px-4 py-3 text-sm text-brand-text shadow-lg',
        className,
      )}
      role="status"
    >
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-brand-on-primary"
        aria-hidden
      >
        ✓
      </span>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
