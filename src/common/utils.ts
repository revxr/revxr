export function shorten(s: string, head = 6, tail = 4): string {
  if (s.length <= head + tail + 2) return s;
  return `${s.slice(0, head)}..${s.slice(-tail)}`;
}
