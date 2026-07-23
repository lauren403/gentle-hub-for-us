export const MIN_SUBMIT_MS = 2500;

/**
 * True when a signup submission looks like a bot: the honeypot field was
 * filled, or the form was submitted implausibly fast after mount.
 */
export function isLikelySpam(
  honeypot: string,
  elapsedMs: number,
  minMs: number = MIN_SUBMIT_MS,
): boolean {
  return honeypot.trim().length > 0 || elapsedMs < minMs;
}

/** Lightweight email-shape check. The server/DB remains the source of truth. */
export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
