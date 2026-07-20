import { createNeonAuth } from '@neondatabase/auth/next/server';

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
    // The v0 preview renders the app inside a cross-site iframe.
    // Without SameSite=None the browser drops the session cookie.
    sameSite: 'none',
  },
});
