import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  SALT: process.env.SALT || "10",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@postgres:5432/TEST_DB?schema=public",
};
