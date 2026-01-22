import { pgTable, uuid, integer, pgEnum } from 'drizzle-orm/pg-core'
import { id, createdAt, updatedAt, title, description } from '../helpers'
import { BudgetTable } from "./budgets"
import { RevenueTable } from "./revenues"

export const budgetStatuses = ["draft", "in_progress", "completed", "not_planned"] as const
export type BudgetStatus = (typeof budgetStatuses)[number]
export const budgetStatusEnum = pgEnum(
    "budgets_status",
    budgetStatuses
)

export const IncomeTable = pgTable("incomes", {
    id,
    budgetId: uuid().
    references(() => BudgetTable.id, { onDelete: "cascade" }) // delete everything associated with budget on delete
    .notNull(),
    revenueId: uuid().
    references(() => RevenueTable.id, {onDelete: "cascade"})
    .notNull(),
    title,
    description,
    amount: integer().notNull(),
    createdAt,
    updatedAt,
  },
)