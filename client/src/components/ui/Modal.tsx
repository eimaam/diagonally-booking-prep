import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Button } from './Button';
import { Card } from './Card';

export interface IModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const Modal = ({ open, onClose, title, subtitle, children, footer, className }: IModalProps) => {
  

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-overlay backdrop-blur-[2px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <Card
        padding="lg"
        className={cn(
          'relative z-10 w-full max-w-md border-brand-border-strong shadow-xl',
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="modal-title" className="text-lg font-semibold text-brand-text">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-1 text-sm text-brand-text-subtle">{subtitle}</p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="ghost"
            className="min-w-9 shrink-0 px-2 py-1 text-lg leading-none text-brand-text"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </Button>





          
        </div>
        <div className="space-y-5">{children}</div>
        {footer ? <div className="mt-8 border-t border-brand-border pt-6">{footer}</div> : null}
      </Card>
    </div>
  );
};

export default Modal;
