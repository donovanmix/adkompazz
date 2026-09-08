export interface Attribution {
  channel: string;
  sourceReferrer: string;
  entryLanding: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  fbclid: string;
}

const STORAGE_KEY = 'adkompas_attribution';

const EMPTY: Attribution = {
  channel: '',
  sourceReferrer: '',
  entryLanding: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmTerm: '',
  utmContent: '',
  gclid: '',
  fbclid: '',
};

const SEARCH_ENGINES = ['google.', 'bing.', 'yahoo.', 'duckduckgo.', 'baidu.', 'yandex.', 'ecosia.', 'ask.'];
const SOCIAL_SITES = [
  'facebook.',
  'instagram.',
  'l.instagram.',
  'lm.facebook.',
  'twitter.',
  't.co',
  'x.com',
  'linkedin.',
  'lnkd.in',
  'tiktok.',
  'youtube.',
  'youtu.be',
  'pinterest.',
  'reddit.',
  'whatsapp.',
  'wa.me',
  't.me',
  'telegram.',
];

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return '';
  }
}

function deriveChannel(a: Omit<Attribution, 'channel'>, currentHost: string): string {
  const medium = a.utmMedium.toLowerCase();

  if (a.gclid) return 'Paid Search';
  if (a.fbclid) return 'Paid Social';
  if (['cpc', 'ppc', 'paid', 'paidsearch', 'paid-search', 'sem'].includes(medium)) return 'Paid Search';
  if (['display', 'cpm', 'banner'].includes(medium)) return 'Display';
  if (['paid-social', 'paidsocial', 'social-paid'].includes(medium)) return 'Paid Social';
  if (['social', 'social-media', 'sm'].includes(medium)) return 'Social';
  if (medium === 'email') return 'Email';
  if (medium === 'affiliate') return 'Affiliate';
  if (medium === 'referral') return 'Referral';
  if (a.utmSource || medium) return 'Campaign';

  const refHost = hostOf(a.sourceReferrer);
  if (!refHost) return 'Direct';
  if (currentHost && refHost === currentHost) return 'Direct';
  if (SEARCH_ENGINES.some((s) => refHost.includes(s))) return 'Organic';
  if (SOCIAL_SITES.some((s) => refHost.includes(s))) return 'Social';
  return 'Referral';
}

/**
 * Captures first-touch attribution on the visitor's first page load and
 * persists it. Subsequent calls return the stored value so the original
 * source is preserved across the session/navigation.
 */
export function captureAttribution(): Attribution {
  if (typeof window === 'undefined') return { ...EMPTY };

  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing) {
      return { ...EMPTY, ...(JSON.parse(existing) as Partial<Attribution>) };
    }
  } catch {
    // ignore parse/storage errors and re-capture
  }

  const params = new URLSearchParams(window.location.search);
  const partial: Omit<Attribution, 'channel'> = {
    sourceReferrer: document.referrer || '',
    entryLanding: window.location.href,
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmTerm: params.get('utm_term') || '',
    utmContent: params.get('utm_content') || '',
    gclid: params.get('gclid') || '',
    fbclid: params.get('fbclid') || '',
  };

  const attribution: Attribution = {
    ...partial,
    channel: deriveChannel(partial, window.location.hostname.toLowerCase()),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // storage may be unavailable (private mode); still return captured value
  }

  return attribution;
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return { ...EMPTY };
  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing) return { ...EMPTY, ...(JSON.parse(existing) as Partial<Attribution>) };
  } catch {
    // ignore
  }
  return captureAttribution();
}
