import { cn } from '../../lib/utils';

export interface ISkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: ISkeletonProps) => (
  <div
    className={cn('animate-pulse rounded-lg bg-brand-surface-muted', className)}
    aria-hidden
  />
);

export default Skeleton;
