import { Router, Request, Response } from "express";

const healthRouter = Router();

// Health check endpoint
healthRouter.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy and running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
  });
});

// Detailed health check with system info
healthRouter.get("/health/detailed", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    server: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      pid: process.pid,
      version: process.version,
    },
    timestamp: new Date().toISOString(),
  });
});

export default healthRouter;
