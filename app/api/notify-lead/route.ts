import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';

export async function POST(request: Request) {
  try {
    const { companyName, name, email, phone, services, attribution } =
      await request.json();

    if (!name || !email || !companyName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const a = attribution ?? {};
    const track = {
      channel: String(a.channel ?? ''),
      sourceReferrer: String(a.sourceReferrer ?? ''),
      entryLanding: String(a.entryLanding ?? ''),
      utmSource: String(a.utmSource ?? ''),
      utmMedium: String(a.utmMedium ?? ''),
      utmCampaign: String(a.utmCampaign ?? ''),
      utmTerm: String(a.utmTerm ?? ''),
      utmContent: String(a.utmContent ?? ''),
      gclid: String(a.gclid ?? ''),
      fbclid: String(a.fbclid ?? ''),
    };

    // Save the lead to the database (does not block the email if it fails)
    try {
      await db.insert(leads).values({
        companyName,
        name,
        email,
        phone: phone || '',
        services: services || '',
        ...track,
      });
    } catch (dbErr) {
      console.error('Failed to save lead to database:', dbErr);
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const submittedAt = new Date().toLocaleString('en-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const esc = (s: string) =>
      s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:12px 0;color:#6b7280;font-size:14px;border-bottom:1px solid #f3f4f6;width:160px;vertical-align:top;">${label}</td>
        <td style="padding:12px 0;color:#111827;font-size:14px;border-bottom:1px solid #f3f4f6;">${value}</td>
      </tr>`;

    const channelColors: Record<string, string> = {
      'Paid Search': '#2563eb',
      'Paid Social': '#7c3aed',
      Display: '#db2777',
      Social: '#0ea5e9',
      Organic: '#10b981',
      Referral: '#f59e0b',
      Email: '#6366f1',
      Affiliate: '#0d9488',
      Campaign: '#8b5cf6',
      Direct: '#6b7280',
    };
    const channelLabel = track.channel || 'Unknown';
    const channelColor = channelColors[track.channel] || '#6b7280';

    const trackRows = [
      track.utmSource && row('UTM Source', esc(track.utmSource)),
      track.utmMedium && row('UTM Medium', esc(track.utmMedium)),
      track.utmCampaign && row('UTM Campaign', esc(track.utmCampaign)),
      track.utmTerm && row('UTM Term', esc(track.utmTerm)),
      track.utmContent && row('UTM Content', esc(track.utmContent)),
      track.gclid && row('Google Click ID', esc(track.gclid)),
      track.fbclid && row('Meta Click ID', esc(track.fbclid)),
      track.sourceReferrer &&
        row(
          'Referrer',
          `<a href="${esc(track.sourceReferrer)}" style="color:#10b981;word-break:break-all;">${esc(track.sourceReferrer)}</a>`
        ),
      track.entryLanding &&
        row(
          'Entry Landing',
          `<a href="${esc(track.entryLanding)}" style="color:#10b981;word-break:break-all;">${esc(track.entryLanding)}</a>`
        ),
    ]
      .filter(Boolean)
      .join('');

    const trackingSection = `
      <p style="margin:28px 0 16px;color:#9ca3af;font-size:12px;letter-spacing:1.5px;font-weight:bold;">TRACKING INFO</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 0;color:#6b7280;font-size:14px;border-bottom:1px solid #f3f4f6;width:160px;vertical-align:top;">Channel</td>
          <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;">
            <span style="display:inline-block;background:${channelColor};color:#ffffff;font-size:12px;font-weight:bold;padding:4px 12px;border-radius:9999px;">${esc(channelLabel)}</span>
          </td>
        </tr>
        ${trackRows}
      </table>`;

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;">
        <div style="background:#10b981;padding:24px 28px;border-radius:8px 8px 0 0;">
          <p style="margin:0 0 8px;color:#d1fae5;font-size:11px;letter-spacing:2px;font-weight:bold;">ADKOMPAS</p>
          <h1 style="margin:0;color:#ffffff;font-size:20px;">New WhatsApp Lead from Adkompas Website</h1>
          <p style="margin:8px 0 0;color:#d1fae5;font-size:13px;">Someone just enquired via the website contact form</p>
        </div>
        <div style="padding:28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          <p style="margin:0 0 16px;color:#9ca3af;font-size:12px;letter-spacing:1.5px;font-weight:bold;">LEAD DETAILS</p>
          <table style="width:100%;border-collapse:collapse;">
            ${row('Name', name)}
            ${row('Company', companyName)}
            ${row('Email', `<a href="mailto:${email}" style="color:#10b981;">${email}</a>`)}
            ${row('Phone', phone)}
            ${row('Services', services)}
            ${row('Submitted At', submittedAt)}
          </table>
          ${trackingSection}
          <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}"
             style="display:block;margin-top:24px;background:#10b981;color:#ffffff;text-decoration:none;text-align:center;padding:14px 0;border-radius:8px;font-size:15px;font-weight:bold;">
            Reply on WhatsApp
          </a>
        </div>
      </div>`;

    const { error } = await resend.emails.send({
      from: 'Adkompas Leads <leads@adkompas.com>',
      to: ['kiensoon@adkompas.com'],
      cc: ['donovanmix@gmail.com'],
      subject: `New WhatsApp Lead: ${name} (${companyName})`,
      replyTo: email,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('notify-lead error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
