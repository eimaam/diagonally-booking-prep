export const formatSlotTime = (iso: string) => {
  const d = new Date(iso);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(d);
};

export const formatSlotParts = (iso: string): { date: string; time: string } => {
  const d = new Date(iso);
  return {
    date: new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(d),
    time: formatSlotTime(iso),
  };
};

export const formatSlotPartsCompact = (iso: string): { date: string; time: string } => {
  const d = new Date(iso);
  return {
    date: new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(d),
    time: formatSlotTime(iso),
  };
};

export const formatSlotDate = (iso: string) => {
  const d = new Date(iso);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
};

export const formatSlotDateTime = (iso: string) => {
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).format(d);
  return { date, time };
};

export const formatTodayHeader = () => {
  const d = new Date();
  return {
    label: 'Today',
    full: new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(d),
  };
};
