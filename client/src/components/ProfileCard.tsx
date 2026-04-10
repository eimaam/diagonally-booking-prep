import type { IProfile } from '../types/types';
import { formatSlotPartsCompact } from '../lib/format';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Skeleton } from './ui/Skeleton';

export interface IProfileCardProps {
  profile: IProfile;
  imageSrc?: string;
  onBook: () => void;
}

export const ProfileCard = ({ profile, imageSrc, onBook }: IProfileCardProps) => (
  <Card className="flex h-full flex-col gap-4">
    <div className="flex gap-3">
      <Avatar src={imageSrc} alt={profile.name} size="lg" shape="square" />
      <div className="min-w-0 flex-1 text-left">
        <p className="truncate font-semibold text-brand-text">{profile.name}</p>
        <p className="truncate text-sm text-brand-text-subtle">{profile.title}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      {profile.availableSlots.slice(0, 3).map((slotIso) => {
        const { date, time } = formatSlotPartsCompact(slotIso);
        return (
          <span
            key={slotIso}
            className="flex flex-col gap-0.5 rounded-md bg-brand-surface-muted px-2.5 py-1.5 text-left text-xs text-brand-text"
          >
            <span className="text-[0.65rem] leading-tight text-brand-text-subtle">{date}</span>
            <span className="font-medium leading-tight">{time}</span>
          </span>
        );
      })}
    </div>
    <Button
      type="button"
      variant="primary"
      fullWidth
      disabled={profile.availableSlots.length === 0}
      onClick={onBook}
    >
      Book Session
    </Button>
  </Card>
);

export const ProfileCardSkeleton = () => (
  <Card className="flex flex-col gap-4">
    <div className="flex gap-3">
      <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-[60%]" />
        <Skeleton className="h-3 w-[40%]" />
      </div>
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-7 w-16 rounded-md" />
      <Skeleton className="h-7 w-16 rounded-md" />
      <Skeleton className="h-7 w-16 rounded-md" />
    </div>
    <Skeleton className="h-10 w-full rounded-lg" />
  </Card>
);
