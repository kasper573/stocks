import { useState, useEffect } from "react";

export function useNow(interval = 60_000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), interval);
    return () => clearInterval(intervalId);
  }, [interval]);
  return now;
}
