import { useEffect, useState } from 'react';

// Custom hook to be used in conjuction to useTheme from 'next-themes'.
// Theme is unknown before hydration so we render the components
// that use useTheme after mount to avoid outdated values.
export default function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return {
    mounted,
  };
}
