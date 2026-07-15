import { useState, useEffect, useRef } from "react";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
export function useScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!trigger) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const total = text.length * 4;
    if (ref.current !== null) {
      clearInterval(ref.current);
    }
    ref.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((c, i) =>
            frame / 4 > i
              ? c
              : c === " "
                ? " "
                : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(""),
      );
      frame++;
      if (frame >= total) {
        if (ref.current !== null) {
          clearInterval(ref.current);
          ref.current = null;
        }
        setDisplay(text);
      }
    }, 22);
    return () => {
      if (ref.current !== null) {
        clearInterval(ref.current);
        ref.current = null;
      }
    };
  }, [trigger, text]);
  return display;
}
