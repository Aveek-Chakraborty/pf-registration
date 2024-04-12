import type { Config } from "drizzle-kit";
export default {
  schema: "./database/schema.ts",
  out: "./drizzle",
  driver:"pg",
  dbCredentials:{
    connectionString: process.env.NEXT_PUBLIC_DB_URL || ""
  }
} satisfies Config;