import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { id, createdAt, updatedAt } from '../helpers'

export const UserTable = pgTable("users", {
    id,
    name: varchar().notNull(),
    imageUrl: varchar(),
    email: varchar().notNull().unique(),
    createdAt,
    updatedAt,
})