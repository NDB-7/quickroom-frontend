// Format to MM:SS
export function formatTime(ms: number) {
  const toTwoDigits = (num: number) => String(num).padStart(2, "0");

  const timeInSeconds = Math.round(ms / 1000);

  const minutes = toTwoDigits(Math.floor((timeInSeconds % 3600) / 60));
  const seconds = toTwoDigits(timeInSeconds % 60);

  return `${minutes}:${seconds}`;
}
