
import {  numeric, pgTable,  text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name",{length: 255}).notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at',{
    withTimezone: true,
  }).defaultNow(),
});


export const mt5accounts = pgTable("mt5accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),

  login: varchar("login", { length: 100 }).notNull(),
  server: varchar("server", { length: 100 }).notNull(),

  accountName: varchar("account_name", { length: 255 }),
  currency: varchar("currency", { length: 10 }),
  balance: numeric("balance"),
  equity: numeric("equity"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});


