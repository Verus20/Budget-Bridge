import { varchar, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const id = uuid().primaryKey().defaultRandom()
export const title = varchar().notNull()
export const description = text().notNull()
export const createdAt = timestamp( 'created_at', { withTimezone: true }).notNull().defaultNow()
export const updatedAt = timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().$onUpdate(() => new Date())