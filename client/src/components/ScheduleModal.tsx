import { useEffect, useState } from 'react';
import type { IProfile } from '../types/types';
import { formatSlotParts } from '../lib/format';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Modal } from './ui/Modal';

export interface IScheduleModalProps {
  open: boolean;
  onClose: () => void;
  profile: IProfile | null;
  imageSrc?: string;
  onConfirm: (username: string, slot: string) => Promise<void>;
}

export const ScheduleModal = ({
  open,
  onClose,
  profile,
  imageSrc,
  onConfirm,
}: IScheduleModalProps) => {
  const [username, setUsername] = useState<string>('');
  const [slot, setSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const reset = () => {
    setUsername('');
    setSlot(null);
    setError(undefined);
  };

  useEffect(() => {
    if (open && profile) {
      setSlot(profile.availableSlots[0] ?? null);
      setUsername('');
      setError(undefined);
    }
  }, [open, profile?.id]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleConfirm = async () => {
    if (!profile || !slot) {
      setError('Select a time slot');
      return;
    }
    const name = username.trim();
    if (!name) {
      setError('Enter your name');
      return;
    }
    setSubmitting(true);
    setError(undefined);
    try {
      await onConfirm(name, slot);
      reset();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  if (!profile) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Schedule Consultation"
      subtitle="Select your preferred time with our expert."
      footer={
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-brand-text-subtle">Consultation Fee</span>
            <span className="font-semibold text-brand-text">$120.00 / hr</span>
          </div>
          <Button
            type="button"
            variant="primary"
            fullWidth
            disabled={!username || !slot || submitting}
            onClick={() => void handleConfirm()}
          >
            Confirm Booking
          </Button>
        </div>
      }
    >
      <Input
        id="booking-name"
        label="Your name"
        placeholder="Enter your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="name"
      />
      <div className="flex flex-col gap-2">
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-brand-text-subtle">
          Selected expert
        </span>
        <Card padding="sm" className="border-brand-border bg-brand-surface-input">
          <div className="flex items-center gap-3">
            <Avatar src={imageSrc} alt={profile.name} size="md" shape="square" />
            <p className="text-left text-sm text-brand-text">
              <span className="font-semibold">{profile.name}</span>
              <span className="text-brand-text-subtle"> — {profile.title}</span>
            </p>
          </div>
        </Card>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-brand-text-subtle">
          Select a slot
        </span>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {profile.availableSlots.map((s) => {
            const selected = slot === s;
            const { date, time } = formatSlotParts(s);
            return (
              <Button
                key={s}
                type="button"
                variant="secondary"
                className={
                  selected
                    ? 'h-auto min-h-[4.25rem] flex-col gap-1 border-2 border-brand-slot-active-border bg-brand-surface-muted py-3 text-brand-slot-active-text'
                    : 'h-auto min-h-[4.25rem] flex-col gap-1 py-3'
                }
                onClick={() => setSlot(s)}
              >
                <span
                  className={
                    selected
                      ? 'text-center text-[0.65rem] leading-tight text-brand-slot-active-text/90'
                      : 'text-center text-[0.65rem] leading-tight text-brand-text-subtle'
                  }
                >
                  {date}
                </span>
                <span className="text-center text-sm font-semibold">{time}</span>
              </Button>
            );
          })}
        </div>
      </div>
      {error ? <p className="text-center text-sm text-brand-primary-muted">{error}</p> : null}
    </Modal>
  );
};
