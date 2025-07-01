import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 250,
  duration: 60,
});

export async function applyRateLimit(userip, points = 1) {
  try {
    await rateLimiter.consume(userip, points);
    return null; 
  } catch (error) {
    if (error instanceof Error && error.msBeforeNext) {
      return { status: 429, message: "Too many requests" };
    }
    throw { status: 429, message: "Too many requests" };
  }
}