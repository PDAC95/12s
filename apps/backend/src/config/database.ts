export const databaseConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "12s_development",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
};
