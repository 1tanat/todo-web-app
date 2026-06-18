import { useState, useEffect } from "react";

// Тикающие "текущее время", чтобы перерисовывать таймеры (цвет, обратный отсчёт, сортировку).
export function useNow(intervalMs = 500) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
