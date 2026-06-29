import { useEffect, useState } from "react";

/** True only after the client has mounted — avoids SSR/client mismatches from localStorage. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
