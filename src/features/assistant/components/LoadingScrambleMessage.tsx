import { useEffect, useState } from "react";
import { Bot } from "lucide-react";

// Same charset family as useScrambleReveal, but this whole line
// re-randomizes every tick (no reveal/progress) — reads as "searching"
// rather than "decoding a known answer", since there's no real
// content to reveal yet at this point (backend hasn't started
// streaming — it's still classifying intent / running retrieval).
const SCRAMBLE_CHARS = String.raw`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>/\[]{}`;
const LINE_WIDTH = 30;
const TICK_MS = 45;

function randomLine(width: number): string {
  let s = "";
  for (let i = 0; i < width; i++) {
    s += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  }
  return s;
}

export function LoadingScrambleMessage() {
  const [line, setLine] = useState(() => randomLine(LINE_WIDTH));

  useEffect(() => {
    const id = setInterval(() => setLine(randomLine(LINE_WIDTH)), TICK_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 rounded-full bg-brand-100 p-1.5 shrink-0">
        <Bot size={13} className="text-brand-600" />
      </div>
      <div className="flex-1 rounded-xl rounded-tl-none bg-navy-50 border border-navy-100 px-3 py-2.5 max-w-[80%]">
        <p className="text-sm text-navy-400 font-mono tracking-wide">{line}</p>
      </div>
    </div>
  );
}
