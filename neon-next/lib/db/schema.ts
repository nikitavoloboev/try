import {
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  username: text("username"),
  tokens: integer("tokens").notNull().default(0),
  unlimitedTokensEndDate: timestamp("unlimited_tokens_end_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const generationInputs = pgTable("generation_inputs", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  type: text("type").notNull(), // image, video
  prompt: text("prompt").notNull(),
  imageUrl: text("image_url").notNull(), // s3
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const generations = pgTable("generations", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  generationInputId: text("generation_input_id")
    .notNull()
    .references(() => generationInputs.id),
  model: text("model").notNull(),
  status: text("status").notNull(),
  imageUrl: text("image_url"), // s3
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  service: text("service").notNull(), // paytech, solbond, euphoria ..
  purchaseCostInCents: integer("purchase_cost_in_cents").notNull(),
  methodOfPurchase: text("method_of_purchase").notNull(), // crypto-ton, crypto-sol, fiat ..
  cryptoTransactionHash: text("crypto_transaction_hash"),
  tokensAmountBought: integer("tokens_amount_bought"), // how many tokens were given
  paymentStatus: text("payment_status"), // pending, paid, failed (with reason)
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
})

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
})

export const affiliates = pgTable("affiliates", {
  id: text("id").primaryKey(),
  login: text("login").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  info: text("info"), // extra info about affiliate
  payoutCryptoCurrency: text("payout_crypto_currency"),
  payoutCryptoAddress: text("payout_crypto_address"),
})

export const affiliateLinks = pgTable("affiliate_links", {
  id: text("id").primaryKey(),
  affiliateId: text("affiliate_id")
    .notNull()
    .references(() => affiliates.id),
  code: text("code").unique().notNull(), // custom code for affiliate for ref=
  clicks: integer("clicks").notNull().default(0),
  signups: integer("signups").notNull().default(0),
  sales: integer("sales").notNull().default(0),
  earnings: numeric("earnings", { precision: 12, scale: 2 })
    .notNull()
    .default("0"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const affiliatePayouts = pgTable("affiliate_payouts", {
  id: text("id").primaryKey(),
  affiliateId: text("affiliate_id")
    .notNull()
    .references(() => affiliates.id),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  cryptoUsed: text("crypto_used").notNull(), // sol, ton ..
  cryptoTransactionHash: text("crypto_transaction_hash"),
  status: text("status").notNull().default("pending"), // pending, completed, failed
  payoutAt: timestamp("payout_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export type User = typeof users.$inferSelect
export type GenerationInput = typeof generationInputs.$inferSelect
export type Generation = typeof generations.$inferSelect
export type Order = typeof orders.$inferSelect
export type Session = typeof sessions.$inferSelect
export type Account = typeof accounts.$inferSelect
export type Verification = typeof verifications.$inferSelect
export type Affiliate = typeof affiliates.$inferSelect
export type AffiliateLink = typeof affiliateLinks.$inferSelect
export type AffiliatePayout = typeof affiliatePayouts.$inferSelect
