import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const rateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(1, "2 s"),

  prefix: "@upstash/ratelimit",
});
