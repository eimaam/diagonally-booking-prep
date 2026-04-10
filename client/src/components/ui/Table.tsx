import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Table = ({
  className,
  ...rest
}: HTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-x-auto">
    <table className={cn('w-full border-collapse text-left', className)} {...rest} />
  </div>
);

export const TableHead = ({
  className,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn('border-b border-brand-border', className)} {...rest} />
);

export const TableBody = ({
  className,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn('divide-y divide-brand-border', className)} {...rest} />
);

export const TableRow = ({ className, ...rest }: HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn('transition-colors hover:bg-brand-surface-muted/40', className)} {...rest} />
);

export const TableTh = ({ className, ...rest }: ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn(
      'px-4 py-3 text-[0.65rem] font-medium uppercase tracking-wide text-brand-text-subtle',
      className,
    )}
    {...rest}
  />
);

export const TableTd = ({ className, ...rest }: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('px-4 py-4 align-middle text-sm text-brand-text', className)} {...rest} />
);
