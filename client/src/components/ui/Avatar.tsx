import { cn } from '../../lib/utils';

export interface IAvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'round' | 'square';
  className?: string;
}

const sizeClass: Record<NonNullable<IAvatarProps['size']>, string> = {
  sm: 'h-8 w-8 min-h-8 min-w-8',
  md: 'h-10 w-10 min-h-10 min-w-10',
  lg: 'h-14 w-14 min-h-14 min-w-14',
};

export const Avatar = ({ src, alt, size = 'md', shape = 'round', className }: IAvatarProps) => (
  <span
    className={cn(
      'inline-block overflow-hidden border border-brand-border bg-brand-surface-muted ring-2 ring-brand-bg',
      shape === 'round' ? 'rounded-full' : 'rounded-lg',
      sizeClass[size],
      className,
    )}
  >
    {/* handle when no image passed... */}
    {src ? (
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    ) : (
      <span
        className="flex h-full w-full items-center justify-center text-xs font-medium text-brand-secondary"
        aria-hidden
      >
        {alt.slice(0, 1).toUpperCase()}
      </span>
    )}
  </span>
);

export default Avatar;
