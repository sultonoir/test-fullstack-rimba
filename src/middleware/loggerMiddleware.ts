import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

// Middleware untuk logging request
export const logRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.info(`Request: ${req.method} ${req.originalUrl}`);
  next();
};

// Middleware untuk logging error
export const logError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: "Terjadi kesalahan pada server" });
};
