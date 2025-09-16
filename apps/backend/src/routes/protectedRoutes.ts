import { Router, Request, Response } from "express";
import { validateJWT } from "../middleware/auth";

const protectedRouter = Router();

// Protected route - requires valid JWT token
protectedRouter.get("/profile", validateJWT, (req: any, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Access granted to protected route",
    user: req.user,
    timestamp: new Date().toISOString(),
    endpoint: "/api/protected/profile",
  });
});

// Protected route - user data
protectedRouter.get("/user-data", validateJWT, (req: any, res: Response) => {
  res.status(200).json({
    success: true,
    message: "User data retrieved successfully",
    data: {
      userId: req.user?.sub || "unknown",
      email: req.user?.email || "unknown",
      name: req.user?.name || "unknown",
      lastAccess: new Date().toISOString(),
    },
  });
});

// Test route without authentication
protectedRouter.get("/public-test", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is a public test route - no authentication required",
    timestamp: new Date().toISOString(),
  });
});

export default protectedRouter;
