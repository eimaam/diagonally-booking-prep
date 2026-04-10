import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface IPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  className?: string;
}

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    {dir === 'left' ? (
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
);

export const Pagination = ({ page, totalPages, onPageChange, className }: IPaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className={cn('flex items-center justify-center gap-2', className)}
      aria-label="Pagination"
    >
      <Button
        type="button"
        variant="secondary"
        className="min-w-10 px-2 py-2"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <Chevron dir="left" />
      </Button>
      {pages.map((p) => (
        <Button
          key={p}
          type="button"
          variant={p === page ? 'primary' : 'secondary'}
          className="min-w-10 px-3 py-2"
          onClick={() => onPageChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </Button>
      ))}
      <Button
        type="button"
        variant="secondary"
        className="min-w-10 px-2 py-2"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <Chevron dir="right" />
      </Button>
    </nav>
  );
};

export default Pagination;
