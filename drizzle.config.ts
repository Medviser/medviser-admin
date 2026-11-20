import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  schemaFilter: ["public"],
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: It's commented to fetch the database
    url: process.env.DATABASE_URL!,
  },
});