import { pgTable, uuid, date, integer, pgEnum, index } from 'drizzle-orm/pg-core'
import { id, createdAt, updatedAt, title, description } from '../helpers'
import { UserTable } from "./user"

export const budgetStatuses = ["draft", "in_progress", "completed", "not_planned"] as const
export type BudgetStatus = (typeof budgetStatuses)[number]
export const budgetStatusEnum = pgEnum(
    "budgets_status",
    budgetStatuses
)

export const BudgetTable = pgTable("budgets", {
    id,
    userId: uuid().
    references(() => UserTable.id, { onDelete: "cascade" }) // delete everything associated with budget on delete
    .notNull(),
    title,
    description,
    status: budgetStatusEnum(),
    budgetStart: date(),
    budgetEnd: date(),
    estimatedBudget: integer(),
    actualBudget: integer().notNull(),
    createdAt,
    updatedAt,
  },
  table => [index().on(table.title)]
)