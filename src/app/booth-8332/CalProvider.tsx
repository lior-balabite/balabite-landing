'use client';

import { useEffect, type ReactNode } from 'react';
import { getCalApi } from '@calcom/embed-react';

export default function CalProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    (async () => {
      try {
        const cal = await getCalApi();
        cal('ui', {
          theme: 'dark',
          cssVarsPerTheme: {
            light: { 'cal-brand': '#0F172A' },
            dark: { 'cal-brand': '#FCD34D' },
          },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      } catch {
        // Cal API may fail in dev with no events configured; degrade gracefully.
      }
    })();
  }, []);

  return <>{children}</>;
}
