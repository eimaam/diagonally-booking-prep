import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import { formatSlotDateTime, formatTodayHeader } from '../lib/format';
import type { IBooking, IProfile } from '../types/types';
import { BookingStatusEnum } from '../types/types';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableTd,
  TableTh,
} from '../components/ui/Table';

const CalendarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-brand-secondary" aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CalendarXIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="mx-auto text-brand-text-muted" aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 15l6 6M15 15l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-brand-text-subtle" aria-hidden>
    <circle cx="12" cy="5" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="19" r="2" />
  </svg>
);

export const MyBookingsPage = () => {
  const navigate = useNavigate();
  const { bookings, profiles, profilesLoading, bookingsLoading } = useDataContext();
  const loading = profilesLoading || bookingsLoading;

  const profileById = useMemo(() => {
    const m = new Map<string, IProfile>();
    for (const p of profiles) m.set(p.id, p);
    return m;
  }, [profiles]);

  const confirmedCount = useMemo(
    () => bookings.filter((b: IBooking) => b.status === BookingStatusEnum.CONFIRMED).length,
    [bookings],
  );

  const today = formatTodayHeader();

  return (
    <div className="flex flex-col gap-10 pb-16">
      <div className="flex flex-col gap-4 text-left">
        <h1 className="text-3xl font-bold tracking-tight text-brand-text sm:text-4xl">Your Sessions</h1>
        <p className="max-w-xl text-sm text-brand-text-subtle sm:text-base">
          Review upcoming consultations and manage your schedule. Confirmed sessions appear here with
          expert details and time slots.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col gap-4 text-left">
          <p className="text-[0.65rem] font-medium uppercase tracking-wide text-brand-text-subtle">
            Current status
          </p>
          <p className="text-2xl font-semibold text-brand-text sm:text-3xl">
            {loading ? '—' : `${confirmedCount} Confirmed Bookings`}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button type="button" variant="primary" onClick={() => navigate('/')}>
              Schedule New Session
            </Button>
            <Button type="button" variant="ghost" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
              View Past Sessions
            </Button>
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <CalendarIcon />
          <p className="text-sm font-medium text-brand-text">{today.label}</p>
          <p className="text-xs text-brand-text-subtle">{today.full}</p>
        </Card>
      </div>

      <Card padding="none" className="overflow-hidden">
        <Table>
          <TableHead>
            <TableRow className="hover:bg-transparent">
              <TableTh>User name</TableTh>
              <TableTh>Expert name</TableTh>
              <TableTh>Time slot</TableTh>
              <TableTh>Status</TableTh>
              <TableTh className="text-right">Actions</TableTh>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableTd colSpan={5} className="py-12 text-center text-brand-text-subtle">
                  Loading…
                </TableTd>
              </TableRow>
            ) : (
              bookings.map((row: IBooking) => {
                const expert = profileById.get(row.profileId);
                const { date, time } = formatSlotDateTime(row.slot);
                return (
                  <TableRow key={row.id}>
                    <TableTd>
                      <div className="flex items-center gap-3">
                        <Avatar alt={row.username} size="sm" />
                        <span className="font-medium">{row.username}</span>
                      </div>
                    </TableTd>
                    <TableTd>{expert?.name ?? '—'}</TableTd>
                    <TableTd>
                      <div className="flex flex-col gap-0.5">
                        <span>{date}</span>
                        <span className="text-xs text-brand-text-subtle">{time}</span>
                      </div>
                    </TableTd>
                    <TableTd>
                      <Badge className="uppercase">{row.status}</Badge>
                    </TableTd>
                    <TableTd className="text-right">
                      <Button type="button" variant="ghost" className="min-w-9 px-2 py-1" aria-label="Row actions">
                        <MoreIcon />
                      </Button>
                    </TableTd>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <div className="flex flex-col items-center gap-3 border-t border-brand-border py-10">
          <CalendarXIcon />
          <p className="text-sm text-brand-text-subtle">No more bookings this week</p>
          <Link
            to="/"
            className="text-sm font-medium text-brand-primary-muted transition-colors hover:text-brand-primary"
          >
            Explore Experts →
          </Link>
        </div>
      </Card>

     
    </div>
  );
};
