'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';

/**
 * Captures first-touch attribution (channel, referrer, UTM params, ad click IDs)
 * on the visitor's first page load. Renders nothing.
 */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
