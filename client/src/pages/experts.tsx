import { useEffect, useMemo, useState } from 'react';
import { useDataContext } from '../context/DataContext';
import { filterProfilesWithAvailability } from '../lib/slotAvailability';
import type { IProfile } from '../types/types';
import { BookingStatusEnum } from '../types/types';
import { ProfileCard, ProfileCardSkeleton } from '../components/ProfileCard';
import { ScheduleModal } from '../components/ScheduleModal';
import { Badge } from '../components/ui/Badge';
import { Pagination } from '../components/ui/Pagination';
import { Toast } from '../components/ui/Toast';

const PAGE_SIZE = 3;

export const ExpertsPage = () => {
  const { profiles, bookings, profilesLoading: loading, createBooking } = useDataContext();
  const [page, setPage] = useState(1);
  const [modalProfile, setModalProfile] = useState<IProfile | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'error'>('success');

  const profilesWithAvailability = useMemo(
    () => filterProfilesWithAvailability(profiles, bookings),
    [profiles, bookings],
  );

  const totalPages = Math.max(1, Math.ceil(profilesWithAvailability.length / PAGE_SIZE));

  const slice = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return profilesWithAvailability.slice(start, start + PAGE_SIZE);
  }, [profilesWithAvailability, page]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const handleConfirm = async (username: string, slot: string): Promise<boolean> => {
    if (!modalProfile) return false;
    console.log({ username, slot })
    const response = await createBooking({
      profileId: modalProfile.id,
      username,
      slot,
      status: BookingStatusEnum.CONFIRMED,
    });
    if (response.success) {
      setToastVariant('success');
      setToastMessage("Booking confirmed! You'll receive an email shortly.");
      setToastOpen(true);
      return true;
    }
    setToastVariant('error');
    setToastMessage(
      response.message?.trim() || 'Could not complete booking. Please try again.',
    );
    setToastOpen(true);
    return false;
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="muted" className="mb-4">
          Technical network
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-brand-text sm:text-4xl md:text-5xl">
          Find your <span className="text-brand-primary-muted">expert</span>
        </h1>
        <p className="mt-4 text-balance text-sm leading-relaxed text-brand-text-subtle sm:text-base">
          Connect with vetted specialists for focused sessions. Pick a profile, choose a slot and lock
          in time that works for both sides. Accelerate your workflow with expert mentorship.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            <ProfileCardSkeleton />
            <div className="hidden sm:block">
              <ProfileCardSkeleton />
            </div>
            <div className="hidden lg:block">
              <ProfileCardSkeleton />
            </div>
          </>
        ) : (
          slice.map((p) => (
            <ProfileCard
              key={p.id}
              profile={p}
              onBook={() => setModalProfile(p)}
            />
          ))
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <ScheduleModal
        open={modalProfile !== null}
        onClose={() => setModalProfile(null)}
        profile={modalProfile}
        onConfirm={handleConfirm}
      />

      <Toast
        open={toastOpen}
        variant={toastVariant}
        message={toastMessage}
        onDismiss={() => setToastOpen(false)}
      />
    </div>
  );
};
