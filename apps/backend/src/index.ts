import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import { appConfig } from "./config/app";
import healthRouter from "./routes/healthRoutes";
import protectedRouter from "./routes/protectedRoutes";

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: appConfig.frontendUrl,
    credentials: true,
  })
);

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", healthRouter);
app.use("/api/protected", protectedRouter);

// Basic root route
app.get("/", (req, res) => {
  res.json({
    message: "12s Backend API",
    status: "running",
    environment: appConfig.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(appConfig.port, () => {
  console.log(`🚀 Server running on port ${appConfig.port}`);
  console.log(`📱 Environment: ${appConfig.nodeEnv}`);
  console.log(`🌐 Frontend URL: ${appConfig.frontendUrl}`);
  console.log(`💚 Health check: http://localhost:${appConfig.port}/api/health`);
  console.log(
    `🔒 Protected routes: http://localhost:${appConfig.port}/api/protected/*`
  );
});
