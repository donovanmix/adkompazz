import type { Metadata } from 'next';
import { ThankYouContent } from '@/components/thank-you-content';

export const metadata: Metadata = {
  title: 'Thank You | Adkompas',
  description: 'Thanks for your enquiry. We will WhatsApp you within 1 working day.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
