import { Redis } from "@upstash/redis";

// No-op mock when Redis is not configured — prevents 22s connection timeouts
const noopRedis = {
  get: async () => null,
  setex: async () => null,
  set: async () => null,
  del: async () => null,
} as unknown as Redis;

const url   = process.env.UPSTASH_REDIS_REST_URL   || process.env.REDIS_URL   || "";
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.REDIS_TOKEN || "";

// Only initialize real Redis if both url and token are present
export const redis: Redis =
  url && token
    ? new Redis({ url, token })
    : noopRedis;
