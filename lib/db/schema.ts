import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  companyName: text('company_name').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  services: text('services').notNull(),
  status: text('status').notNull().default('new'),
  notes: text('notes').notNull().default(''),
  // Attribution / tracking
  channel: text('channel').notNull().default(''),
  sourceReferrer: text('source_referrer').notNull().default(''),
  entryLanding: text('entry_landing').notNull().default(''),
  utmSource: text('utm_source').notNull().default(''),
  utmMedium: text('utm_medium').notNull().default(''),
  utmCampaign: text('utm_campaign').notNull().default(''),
  utmTerm: text('utm_term').notNull().default(''),
  utmContent: text('utm_content').notNull().default(''),
  gclid: text('gclid').notNull().default(''),
  fbclid: text('fbclid').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
