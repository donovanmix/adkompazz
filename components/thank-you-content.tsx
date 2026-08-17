'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

export function ThankYouContent() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    // Google Tag Manager: push a conversion event to the dataLayer.
    // Use "lead_form_submitted" as the Custom Event trigger name in GTM.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lead_form_submitted',
      conversion_page: '/thank-you',
    });

    // Meta Pixel: standard Lead conversion event
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }

    // Google Ads: conversion event (requires conversion label)
    if (
      typeof window.gtag === 'function' &&
      GOOGLE_ADS_ID &&
      GOOGLE_ADS_CONVERSION_LABEL
    ) {
      window.gtag('event', 'conversion', {
        send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-emerald-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-emerald-600" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-balance">
          Thank you for your enquiry!
        </h1>

        <p className="text-sm text-gray-600 leading-relaxed text-pretty">
          Your details have been sent to our team. We&apos;ll WhatsApp you within
          1 working day. If WhatsApp didn&apos;t open automatically, tap the
          button below.
        </p>

        <div className="flex flex-col w-full gap-3 mt-2">
          <a
            href="https://wa.me/60103746325"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold flex items-center justify-center transition-colors"
          >
            Open WhatsApp
          </a>
          <Link
            href="/"
            className="w-full h-11 rounded-lg border border-gray-200 hover:border-emerald-300 text-gray-700 font-semibold flex items-center justify-center transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
