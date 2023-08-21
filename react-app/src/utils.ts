export const getCurrentDateTime = (): string => {
  const now: Date = new Date();
  const year: number = now.getUTCFullYear();
  const month: string = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day: string = String(now.getUTCDate()).padStart(2, '0');
  const hours: string = String(now.getUTCHours()).padStart(2, '0');
  const minutes: string = String(now.getUTCMinutes()).padStart(2, '0');
  const seconds: string = String(now.getUTCSeconds()).padStart(2, '0');
  const milliseconds: string = String(now.getUTCMilliseconds()).padStart(
    3,
    '0'
  );

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};
