export const cn = (...parts: (string | boolean | undefined | null)[]) =>
  parts.filter(Boolean).join(' ');
