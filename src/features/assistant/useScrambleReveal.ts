import { useEffect, useRef, useState } from "react";

// Cyberpunk-ish charset for the scramble effect — mixed case, digits,
// and a few symbols reads as "decoding" rather than just noise.
const SCRAMBLE_CHARS = String.raw`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>/\[]{}`;

const TAIL_LENGTH = 6;
const TICK_MS = 35;

function randomChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

/**
 * Reveals `target` progressively (character-by-character, like the
 * real streaming text it's mirroring) but keeps a short window of
 * randomized "scrambling" characters just ahead of the revealed
 * prefix — a decode-in-progress effect. Catches up automatically if
 * `target` jumps ahead in bursts (multiple WS frames landing in one
 * render tick) so the reveal never falls far behind the real content.
 *
 * The interval is set up once and reads the latest target via a ref
 * — target changes on every token (faster than TICK_MS), so an
 * effect keyed on `target` would keep tearing down and recreating
 * the interval before it ever got a chance to fire.
 */
export function useScrambleReveal(target: string): string {
  const [display, setDisplay] = useState("");
  const targetRef = useRef(target);
  const revealedRef = useRef(0);

  useEffect(() => {
    if (target === "" && targetRef.current !== "") {
      revealedRef.current = 0;
      setDisplay("");
    }
    targetRef.current = target;
  }, [target]);

  useEffect(() => {
    const id = setInterval(() => {
      const current = targetRef.current;
      const targetLen = current.length;
      const backlog = targetLen - revealedRef.current;

      if (backlog > 0) {
        const step = backlog > 16 ? Math.ceil(backlog / 8) : 1;
        revealedRef.current = Math.min(targetLen, revealedRef.current + step);
      }

      const revealed = revealedRef.current;
      const realPart = current.slice(0, revealed);
      let tail = "";
      for (let i = 0; i < TAIL_LENGTH; i++) tail += randomChar();

      setDisplay(realPart + tail);
    }, TICK_MS);

    return () => clearInterval(id);
  }, []);

  return display;
}
