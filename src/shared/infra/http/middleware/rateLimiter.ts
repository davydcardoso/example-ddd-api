import { Request, Response, NextFunction } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { AppError } from "@shared/http/errors/AppError";
import { redisConnection } from "@shared/redis/connection";

const limiter = new RateLimiterRedis({
  storeClient: redisConnection,
  keyPrefix: "rateLimit",
  points: 5,
  duration: 1,
});

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(req.ip);

    return next();
  } catch (err) {
    throw new AppError("Too many requests", 429);
  }
}
