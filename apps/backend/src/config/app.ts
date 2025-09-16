export const appConfig = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "dev-secret-key",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};
