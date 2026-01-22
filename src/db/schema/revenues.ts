import { pgTable, varchar, integer } from 'drizzle-orm/pg-core'
import { id, createdAt, updatedAt, title, description } from '../helpers'

export const RevenueTable = pgTable("incomes", {
    id,
    title,
    description,
    amount: integer().notNull(),
    source: varchar().notNull(),
    createdAt,
    updatedAt,
  },
)