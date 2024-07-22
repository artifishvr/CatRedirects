import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ['.env'] });

export default defineConfig({
    dialect: "sqlite",
    driver: "turso",
    schema: "./src/lib/schema.js",
    dbCredentials: {
        url: process.env.DB_URL,
        authToken: process.env.DB_TOKEN,
    },
    out: "./drizzle",
});
