import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request interface to include user
interface AuthenticatedRequest extends Request {
  user?: any;
}

// Simple JWT validation middleware (basic version for Sprint 1)
export const validateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      error: "Access token required",
      message: "Please provide a valid Bearer token",
    });
    return;
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  try {
    // For Sprint 1, we'll do basic validation
    // In production, this would validate against Auth0's public keys
    const decoded = jwt.decode(token);

    if (!decoded) {
      res.status(401).json({
        error: "Invalid token",
        message: "Token could not be decoded",
      });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Token validation failed",
      message: "Invalid or expired token",
    });
    return;
  }
};

// Optional: Role-based access control
export const requireRole = (role: string) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user || !req.user.roles || !req.user.roles.includes(role)) {
      res.status(403).json({
        error: "Insufficient permissions",
        message: `Role '${role}' required`,
      });
      return;
    }
    next();
  };
};
