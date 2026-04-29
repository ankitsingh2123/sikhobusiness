/**
 * Central API base URL utility.
 * - In development: empty string → Next.js proxy rewrites /api/* → localhost:5000/api/*
 * - In production: set NEXT_PUBLIC_API_URL=https://api.yourdomain.com in env
 */
export const API_BASE = "https://seekhobusinessbackend.onrender.com";

/**
 * Build a full API URL path.
 * Usage: apiUrl("/api/user/me") → "" + "/api/user/me" (dev) or "https://api.xxx.com/api/user/me" (prod)
 */
export const apiUrl = (path: string) => `${API_BASE}${path}`;
